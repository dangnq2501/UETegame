import {Firestore} from "../config/firebaseInit";
import {globalCache} from "../server";
import {setUserPossession} from "./possessionController";

export const internalGetUserInfo = async (uid) => {
    const cached = globalCache.get("users/" + uid);
    if (cached) return cached;
    else {
        try {
            const doc = await Firestore.collection("user_data")
                .doc(uid)
                .get();
            if (doc.exists) {
                globalCache.set("users/" + uid, doc.data());
                return doc.data();
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    }
};

export const getUserInfo = async (req, res) => {
    const uid = req.body.uid;
    const resUID = req.body.data;
    if (uid == null || uid == "" || resUID == null || resUID == "") return res.json({"msg": "err User not vaild", "data": null});
    const data = await internalGetUserInfo(resUID);
    if (data) return res.json({"msg": "ok", "data": data});
    else return res.json({"msg": "err No data", "data": null});
};

export const setUserInfo = (req, res) => {
    const uid = req.body.uid;
    const newUserInfo = req.body.data;
    if (uid == null || uid == "") return res.json({"msg": "err User not vaild", "data": null});
    if (newUserInfo == null || newUserInfo.uid != uid) return res.json({"msg": "err Data not vaild", "data": null});
    Firestore.collection("user_data").doc(uid).update(newUserInfo)
        .then(() => {
            globalCache.set("users/" + uid, newUserInfo);
            return res.json({"msg": "ok", "data": null});
        })
        .catch((error) => {
            return res.json({"msg": "err " + error, "data": null});
        });
};

export const initRegisterUser = (req, res) => {
    const uid = req.body.uid;
    const data = req.body.data;
    if (uid == null || uid == "" || data == null || data.uid != uid) return res.json({"msg": "err User not vaild", "data": null});
    setUserPossession(uid, {balance: 100, items: {}});
    Firestore.collection("user_data").doc(uid).set(data)
        .then(() => {
            globalCache.set("users/" + uid, data);
            return res.json({"msg": "ok", "data": null});
        })
        .catch((error) => {
            return res.json({"msg": "err " + error, "data": null});
        });
};
