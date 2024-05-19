import {globalCache} from "../server";
require("dotenv").config();

const internalGetObjectCache = (uid, rid) => {
    const cached = globalCache.get(`/objectList/${uid}/${rid}`);
    if (cached) {
        return cached;
    } else {
        return null;
    }
};
export const getObject = (req, res) => {
    const uid = req.body.uid;
    const rid = req.body.rid;
    if (uid == null || uid == "") {
        return res.json({msg: "err"});
    }
    if (rid == null || rid == "") {
        return res.json({msg: "err"});
    }
    const cached = internalGetObjectCache(uid, rid);
    if (cached == null) {
        return res.json({msg: "err cache doesn't exist"});
    }
    return res.json(cached);
};

export const internalUpdateObjectCache = (uid, rid, data) => {
    globalCache.set(`/objectList/${uid}/${rid}`, data);
};

export const postObject = (req, res) => {
    const uid = req.body.uid;
    const rid = req.body.rid;
    const data = req.body.data;
    if (uid == null || uid == "") {
        return res.json({msg: "err"});
    }
    if (rid == null || rid == "") {
        return res.json({msg: "err"});
    }
    internalUpdateObjectCache(uid, rid, data);
    return res.json({msg: "ok", data: data});
};
