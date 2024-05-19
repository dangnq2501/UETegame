import {globalCache} from "../server";
import {internalGetRoomInfo, internalUpdateCacheListRoom} from "./roomController";
import {internalUpdateUserBalance} from "./possessionController";
import {Database, ServerValue} from "../config/firebaseInit";
const axios = require("axios");
require("dotenv").config();

export const internalGetGameInfo = async (rid) => {
    let gameData = globalCache.get("gameDataPublic/" + rid);
    if (gameData) return gameData;
    gameData = {details: {}, players: {}};
    const arr = await internalUpdateCacheListRoom(rid);
    if (arr == null) return false;
    arr.forEach((e) => {
        Object.assign(gameData.players, {
            [e.user.uid]: {
                online: false,
                ready: (e.data.mode == 9 ? 9 : 0),
                ended: false,
            },
        });
    });
    globalCache.set("gameDataPublic/" + rid, gameData);
    return gameData;
};

export const internalGetCorrectAnswer = async (rid) => {
    const gameAns = globalCache.get("gameAnswer/" + rid);
    if (gameAns) return gameAns;
    const testId = (await internalGetRoomInfo(rid)).testid;
    return new Promise((resolve) => {
        const config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${process.env.BACKEND_FLASK_URI}/data/${testId}/answers`,
            headers: {},
        };
        console.log(config)
        axios.request(config)
            .then((response) => {
                console.log(`Got answer for room ${rid}: ${response.data.answers}`);
                globalCache.set("gameAnswer/" + rid, response.data.answers);
                return resolve(response.data.answers);
            })
            .catch((error) => {
                console.log("Flask server error: ", error);
                return resolve(null);
            });
    });
};

export const internalCheckAns = async (noQues, ans, uid, rid) => {
    if (uid == null || rid == null) return null;
    const gameAns = await internalGetCorrectAnswer(rid);
    return (gameAns[parseInt(noQues)] == parseInt(ans));
};

export const internalCheckAllReady = async (status, rid) => {
    if (rid == null) return null;
    const gameData = await internalGetGameInfo(rid);
    if (gameData == false) return null;
    // eslint-disable-next-line no-unused-vars
    for (const [key, value] of Object.entries(gameData.players)) {
        if (value.online == true && value.ready < status) return false;
    }
    return true;
};

export const internalCheckAllEnded = async (rid) => {
    if (rid == null) return false;
    const gameData = await internalGetGameInfo(rid);
    if (gameData == false || gameData.players == null) return false;
    if (globalCache.get("listenForAllReady/" + rid) != null) return false;
    // eslint-disable-next-line no-unused-vars
    for (const [key, value] of Object.entries(gameData.players)) {
        if (key != gameData.owner && value.online == true && value.ended == false) return false;
    }
    return true;
};

export const internalUpdateOnlineStatus = async (status, uid, rid) => {
    if (uid == null || rid == null) return null;
    const gameData = await internalGetGameInfo(rid);
    if (gameData == false) return null;
    if (gameData.players[uid] == null) {
        Object.assign(gameData.players, {
            [uid]: {
                online: status,
                ready: 0,
                ended: false,
            },
        });
    } else {
        Object.assign(gameData.players[uid], {
            online: status,
        });
    }
    globalCache.set("gameDataPublic/" + rid, gameData);
    return true;
};

export const internalUpdateReadyStatus = async (status, uid, rid) => {
    if (uid == null || rid == null) return null;
    const gameData = await internalGetGameInfo(rid);
    if (gameData == false) return null;
    if (gameData.players[uid] == null) {
        Object.assign(gameData.players, {
            [uid]: {
                online: true,
                ready: parseInt(status),
                ended: false,
            },
        });
    } else {
        Object.assign(gameData.players[uid], {
            ready: parseInt(status),
        });
    }

    globalCache.set("gameDataPublic/" + rid, gameData);
    return true;
};

export const internalStartGame = async (uid, rid) => {
    if (uid == null || rid == null) return null;
    const doc = await internalGetRoomInfo(rid);
    if (doc.owner != uid) return null;
    const result = await internalCheckAllReady(1, rid);
    if (result == true) {
        const gameData = await internalGetGameInfo(rid);
        if (gameData == null) return null;
        globalCache.set("gameDataPublic/" + rid, gameData);
    }
    return result;
};

export const internalCalcPoint = async (uid, rid, status, corStreak, incorStreak, timeTaken, pStats) => {
    const data = await internalGetRoomInfo(rid);
    if (data.diff === "Easy") data.diff = 0.2;
    if (data.diff === "Normal") data.diff = 0.5;
    if (data.diff === "Hard") data.diff = 0.9;
    data.tframe = parseInt(data.tframe);
    let scP = 1;
    let scE = 1;
    if (pStats.hp == 1) {
        scP = 0.6;
        scE = 1.5;
    }
    if (status) {
        return ~~((450 + 30 * pStats.atk) * (0.5 + (Math.min(10, corStreak) / 10) * 0.3 + (1 - (timeTaken / (1000 * data.tframe))) * 0.7) * (0.7 + data.diff) * scP * (1 + pStats.buff));
    } else {
        return ~~(-150 * (0.5 + (Math.min(5, incorStreak) / 5) * 0.5) * (0.8 + data.diff) * (1 + (20 - pStats.def) / 20) * scE);
    }
};

export const internalCalcGem = async (rid, points) => {
    const data = await internalGetRoomInfo(rid);
    if (data.diff === "Easy") data.diff = 0.2;
    if (data.diff === "Normal") data.diff = 0.5;
    if (data.diff === "Hard") data.diff = 0.9;
    return ~~(Math.max(points / 100, 0) * (0.8 + data.diff * 2));
};

export const internalAfterGame = async (uid, rid, points, gems, corCnt) => {
    if (uid == null || rid == null) return null;
    await internalUpdateUserBalance(uid, "deposit", gems);
    const gameData = await internalGetGameInfo(rid);
    if (gameData == false) return null;
    if (gameData.players[uid] == null) {
        Object.assign(gameData.players, {
            [uid]: {
                online: false,
                ready: 2,
                ended: true,
            },
        });
    } else {
        Object.assign(gameData.players[uid], {
            ended: true,
        });
    }
    globalCache.set("gameDataPublic/" + rid, gameData);
    return new Promise((resolve) => {
        Database.ref(`rooms_data/${rid}/userPart/${uid}`).update({
            points,
            gems,
            corCnt,
            ts: ServerValue.TIMESTAMP,
        }, (error) => {
            if (error) {
                resolve(false);
                return;
            }
            resolve(true);
            return;
        });
    });
};

export const getSummaryAfterGame = async (req, res) => {
    const uid = req.body.uid;
    const data = req.body.data;
    if (uid == null || uid == "" || data == null) {
        return res.json({"msg": "err Data not vaild", "data": null});
    }
    let sts = globalCache.get(`roomStartTime/${data}`);
    if (sts == null) {
        const tmpSts = (await Database.ref(`rooms_data/${data}/general`).get()).val();
        if (tmpSts != null) {
            sts = tmpSts.sts;
            globalCache.set(`roomStartTime/${data}`, sts);
        }
    }
    const totalQues = (await internalGetRoomInfo(data)).qnum;
    const playerData = await Database.ref(`rooms_data/${data}/userPart/${uid}`).get();
    if (!playerData.exists) {
        return res.json({"msg": "err Data not vaild", "data": null});
    } else {
        const playerVal = playerData.val();
        const totalTime = playerVal.ts - sts;
        Object.assign(playerVal, {
            totalTime,
            totalQues,
        });
        return res.json({"msg": "ok", "data": playerVal});
    }
};

export const internalCheckOwner = async (uid, rid) => {
    if (uid == null || rid == null) return false;
    const doc = await internalGetRoomInfo(rid);
    if (doc.owner != uid) return false;
    return true;
};

export const postGameContext = async (req, res) => {
    const uid = req.body.uid;
    const rid = req.body.rid;
    const data = req.body.data;
    if (uid == null || uid == "" || rid == null || rid == "" || data == null) {
        return res.json({"msg": "err Data not vaild", "data": null});
    }
    globalCache.set(`gameContext/${rid}/${uid}`, data, 28800);
    return res.json({"msg": "ok", "data": null});
};

export const getGameContext = async (req, res) => {
    const uid = req.body.uid;
    const rid = req.body.rid;
    if (uid == null || uid == "" || rid == null || rid == "") {
        return res.json({"msg": "err Data not vaild", "data": null});
    }
    return res.json({"msg": "ok", "data": globalCache.get(`gameContext/${rid}/${uid}`)});
};

export const getGameStatus = async (req, res) => {
    const uid = req.body.uid;
    const data = req.body.data;
    if (uid == null || uid == "" || data == null) {
        return res.json({"msg": "err Data not vaild", "data": null});
    }
    const result = await internalGetGameInfo(data);
    if (result == false) return res.json({"msg": "err Data not vaild", "data": null});
    return res.json({"msg": "ok", "data": result});
};
