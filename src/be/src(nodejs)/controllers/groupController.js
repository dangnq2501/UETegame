import {Database, Firestore, ServerValue} from "../config/firebaseInit";
import {Group} from "../models/Group";
import {b56gen} from "../utils";
import {internalGetUserInfo} from "./userController";
import {internalCreateRoom, internalGetRoomInfo} from "./roomController";
import {GroupMember} from "../models/GroupMember";

require("dotenv").config();

const internalGetGroup = async (groupId) => {
    if (groupId == null || groupId == "") {
        return null;
    }
    const groupData = await Firestore.collection("group").doc(groupId).get();
    if (!groupData.exists) {
        return null;
    } else {
        return groupData.data();
    }
};

export const getGroup = async (req, res) => {
    const uid = req.body.uid;
    const data = req.body.data;
    if (uid == "" || uid == null) {
        return res.json({msg: "err invalid uid", data: null});
    }
    const groupId = data.groupId;
    const group = await internalGetGroup(groupId);
    if (group) {
        return res.json({msg: "ok", data: group});
    } else {
        return res.json({msg: "err invalid group", data: null});
    }
};

export const internalGetGroupProperties = async (groupId) => {
    if (groupId == null || groupId == "") {
        return null;
    }
    const groupData = await Database.ref("groups").child(groupId).get();
    const group = groupData.val();
    if (!groupData.exists) {
        return null;
    } else {
        return group;
    }
};
export const internalGetGroupList = async (uid) => {
    const groupsData = (
        await Database.ref(`users_data/${uid}/groups`).get()
    ).val();
    const groupList = [];
    // eslint-disable-next-line guard-for-in
    for (const group in groupsData) {
        groupList.push(group);
    }
    return groupList;
};
export const getGroupInfoList = async (req, res) => {
    const uid = req.body.uid;
    if (uid == "" || uid == null) {
        return res.json({msg: "err invalid uid", data: null});
    }
    const groupList = await internalGetGroupList(uid);
    const groupInfoList = [];
    for (const groupId of groupList) {
        const groupInfo = {};
        const groupDesc = await internalGetGroup(groupId);
        Object.assign(groupInfo, groupDesc);
        const memberData = await Database.ref(`groups/${groupId}/members`).get();
        if (!memberData.exists() || memberData == null || memberData.val() == null) continue;
        const memberCount = Object.keys(memberData.val()).length;
        Object.assign(groupInfo, {memberCount: memberCount});
        groupInfoList.push(groupInfo);
    }
    return res.json({msg: "ok", groupInfoList: groupInfoList});
};

export const internalGetAllGroupRooms = async (groupIdList) => {
    const roomsData = {};
    for (const groupId of groupIdList) {
        const data = await internalGetGroupProperties(groupId);
        if (data == null || data.rooms == null) continue;
        const rooms = data.rooms;
        // eslint-disable-next-line guard-for-in
        for (const roomId in rooms) {
            roomsData[roomId] = await internalGetRoomInfo(roomId);
        }
    }
    return roomsData;
};
export const getALlGroupsRooms = async (req, res) => {
    const uid = req.body.uid;
    if (uid == "" || uid == null) {
        return res.json({msg: "err invalid uid", data: null});
    }
    const data = await internalGetAllGroupRooms(await internalGetGroupList(uid));
    res.json({msg: "ok", data: data});
};
export const getGroupProperties = async (req, res) => {
    const uid = req.body.uid;
    const data = req.body.data;
    if (uid == "" || uid == null || data == null || data.groupId == null) {
        return res.json({msg: "err invalid uid", data: null});
    }
    const groupId = data.groupId;
    const properties = await internalGetGroupProperties(groupId);
    if (properties) {
        return res.json({msg: "ok", data: properties});
    } else {
        return res.json({msg: "err", data: null});
    }
};
export const createGroup = async (req, res) => {
    const uid = req.body.uid;
    const data = req.body.data;
    if (uid == "" || uid == null) {
        return res.json({msg: "err invalid uid", data: null});
    }
    const name = data.name || "";
    const desc = data.desc || "";
    const members = data.members || {};
    const rooms = data.rooms || {};
    const courses = data.courses || {};
    const groupId = b56gen(process.env.GROUP_ID_LENGTH || 6);
    while (true) {
        const tmpDoc = await Firestore.collection("group").doc(groupId).get();
        if (!tmpDoc.exists) {
            break;
        }
    }

    const newGroup = new Group(
        groupId,
        uid,
        name,
        desc,
        members || {},
        rooms || {},
        courses || {},
    );

    Firestore.collection("group")
        .doc(groupId)
        .set(newGroup.infoToJSON())
        .then(
            () => {
                Database.ref(`groups/${groupId}/members`)
                    .child(uid)
                    .set({role: "owner"});
                Database.ref(`users_data/${uid}/groups`)
                    .child(groupId)
                    .set({role: "owner"});
                return res.json({msg: "ok group created", data: groupId});
            },
            (error) => {
                return res.json({msg: `err ${error}`, data: null});
            },
        );
};

export const deleteGroup = async (req, res) => {
    const uid = req.body.uid;
    const data = req.body.data;
    if (uid == "" || uid == null) {
        return res.json({msg: "err invalid uid", data: null});
    }
    const groupId = data.groupId;
    const group = await internalGetGroup(groupId);
    const ownerId = group.ownerId;
    if (uid !== ownerId) {
        return res.json({msg: "err invalid action"});
    }
    Firestore.collection("group").doc(groupId).delete();
    Database.ref("groups").child(groupId).remove();
    return res.json({msg: "ok"});
};

export const groupAddMember = async (req, res) => {
    const uid = req.body.uid;
    const data = req.body.data;
    if (uid == "" || uid == null || data == null || data.groupId == null || data.member == null) {
        return res.json({msg: "error", data: null});
    }
    const groupId = data.groupId;
    const memberId = data.member;
    const group = await internalGetGroup(groupId);
    const user = await internalGetUserInfo(memberId);
    if (group == null || user == null) {
        return group == null ?
            res.json({msg: "err invalid group", data: null}) :
            res.json({
                msg: "err invalid user",
                data: null,
            });
    }
    Database.ref(`groups/${groupId}/members`)
        .child(memberId)
        .set({role: "member", overall: 0});
    Database.ref(`users_data/${memberId}/groups`)
        .child(groupId)
        .set({role: "member"});
    return res.json({msg: "ok added member", data: memberId});
};

export const groupAddNewRoom = async (req, res) => {
    const uid = req.body.uid;
    const data = req.body.data;
    if (uid == "" || uid == null || data == null || data.groupId == null || data.roomData == null) {
        return res.json({msg: "err invalid uid", data: null});
    }
    const groupId = data.groupId;
    const roomData = data.roomData;
    const group = await internalGetGroup(groupId);

    if (group == null) {
        return res.json({msg: "err invalid group", data: null});
    }
    const roomId = await internalCreateRoom(uid, roomData);
    await Database.ref(`groups/${groupId}/rooms`)
        .child(roomId)
        .set({status: "ok"});
    await Database.ref(`rooms_data/${roomId}/group_list`)
        .child(groupId)
        .set({status: 1});
    return res.json({msg: "ok added new room", data: roomId});
};

export const groupAddExistingRoom = async (req, res) => {
    const uid = req.body.uid;
    const data = req.body.data;
    if (uid == "" || uid == null || data == null || data.groupId == null || data.roomId == null) {
        return res.json({msg: "err invalid uid", data: null});
    }
    const groupId = data.groupId;
    const roomId = data.roomId;
    const group = await internalGetGroup(groupId);

    if (group == null) {
        return res.json({msg: "err invalid group", data: null});
    }

    const room = await internalGetRoomInfo(roomId);
    if (room == null) {
        return res.json({msg: "err no such room", data: null});
    }
    await Database.ref(`groups/${groupId}/rooms`)
        .child(roomId)
        .set({status: "ok"});
    await Database.ref(`rooms_data/${roomId}/group_list`)
        .child(groupId)
        .set({status: 1});
    return res.json({msg: "ok added room", data: roomId});
};

export const internalGroupUpdatePlayer = async (groupId, userId, points) => {
    if (groupId == null || groupId == "" || userId == null || userId == "" || points == null) {
        return console.log({msg: "err invalid data", data: null});
    }
    const group = await internalGetGroup(groupId);
    if (group == null) {
        return console.log({msg: "err invalid group", data: null});
    }
    return new Promise((resolve) => {
        Database.ref(`groups/${groupId}/members/${userId}`).update(
            {overall: ServerValue.increment(points)},
            (error) => {
                resolve(error ? false : true);
                return;
            },
        );
    });
};

export const internalGroupUpdateOverall = async (lastRoomId) => {
    const userData = await Database.ref(
        `rooms_data/${lastRoomId}/userPart`,
    ).get();
    const groupData = await Database.ref(
        `rooms_data/${lastRoomId}/group_list`,
    ).get();
    if (!userData.exists()) {
        return console.log({msg: "err invalid room", data: null});
    }
    const lastRoomPlayer = userData.val();
    const updData = {};
    for (const player in lastRoomPlayer) {
        if (lastRoomPlayer[player].mode === 1) {
            const points = lastRoomPlayer[player].points;
            updData[player] = {
                role: "member",
                overall: ServerValue.increment(points),
            };
        }
    }
    const groupList = groupData.val();
    // eslint-disable-next-line guard-for-in
    for (const groupId in groupList) {
        Database.ref(`groups/${groupId}/members`).update(updData);
    }
    return console.log({msg: "ok updated points"});
};

export const groupGetRanking = async (req, res) => {
    const uid = req.body.uid;
    const data = req.body.data;
    if (uid == "" || uid == null || data == null || data.groupId == null) {
        return res.json({msg: "err invalid uid", data: null});
    }
    const groupId = data.groupId;
    const group = await internalGetGroup(groupId);
    if (group == null) {
        return res.json({msg: "err invalid group", data: null});
    }
    const membersList = (
        await Database.ref(`groups/${groupId}/members`).get()
    ).val();
    const currentRanking = [];
    for (const member in membersList) {
        if (membersList[member].role === "member") {
            const memberInfo = await internalGetUserInfo(member);
            currentRanking.push(
                new GroupMember(
                    member,
                    memberInfo.uname,
                    membersList[member].overall,
                    memberInfo,
                ),
            );
        }
    }
    currentRanking.sort((memA, memB) => {
        if (memA.overallEvaluation > memB.overallEvaluation) {
            return -1;
        } else if (memA.overallEvaluation < memB.overallEvaluation) {
            return 1;
        } else {
            if (memA.name > memB.name) {
                return 1;
            } else if (memA.name < memB.name) {
                return -1;
            } else {
                return 0;
            }
        }
    });

    let rank = 1;
    const ranking = currentRanking.map((member) => {
        return {
            rank: rank++,
            memberData: member.data,
            overallEvaluation: member.overallEvaluation,
        };
    });
    return res.json({msg: "ok ranking", data: ranking});
};
