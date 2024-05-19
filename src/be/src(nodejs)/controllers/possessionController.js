import {FieldValue, Firestore} from "../config/firebaseInit";

const internalGetUserPossession = async (uid) => {
    if (uid == null || uid == "") return null;
    const doc = await Firestore.collection("storage")
        .doc(uid).get();
    if (doc.exists) {
        return doc.data();
    } else {
        return null;
    }
};

export const getUserPossession = async (req, res) => {
    const uid = req.body.uid;
    if (uid == null || uid == "") return res.json({"data": null, "msg": "err User not vaild"});
    const data = await internalGetUserPossession(uid);
    if (data) {
        return res.json({"data": data, "msg": "ok"});
    } else {
        return res.json({"data": null, "msg": "err"});
    }
};

export const setUserPossession = (uid, data) => {
    if (uid == null || uid == "") {
        return;
    }
    Firestore.collection("storage").doc(uid)
        .set(data)
        .then(() => {
            console.log("possession set");
        })
        .catch((error) => {
            console.log(error);
        });
};

export const addItemToUser = async (uid, data) => {
    if (uid == null || uid == "") {
        return;
    }
    const item = data.item;
    const itemInfo = data.itemInfo;
    const currentPossession = await internalGetUserPossession(uid);
    const itemList = currentPossession.items;
    itemList[item] = itemInfo;
    setUserPossession(uid, {balance: currentPossession.balance, items: itemList});
};

export const internalUpdateUserBalance = async (uid, action, amount) => {
    if (uid == null || uid == "") {
        return;
    }
    const balanceData = await internalGetUserPossession(uid);
    if (balanceData === null) {
        return null;
    }
    const currentBalance = balanceData.balance;
    if (amount < 0) {
        return null;
    }
    const balanceDoc = Firestore.collection("storage").doc(uid);
    if (action === "set") {
        return balanceDoc.update("balance", amount);
    } else {
        if (action === "deposit") {
            return balanceDoc.update("balance", FieldValue.increment(amount));
        } else {
            if (currentBalance < amount) {
                return null;
            } else {
                return balanceDoc.update("balance", FieldValue.increment(-amount));
            }
        }
    }
};

export const updateUserBalance = async (req, res) => {
    const uid = req.body.uid;
    const amount = req.body.data.amount;
    const action = req.body.data.action;
    const updatedBalance = await internalUpdateUserBalance(uid, action, amount);
    if (uid == null || uid == "") {
        return res.json({"data": null, "msg": "err User not vaild"});
    }
    if (updatedBalance === null) {
        return res.json({"data": null, "msg": "err Invalid transaction"});
    }
    const balanceData = await internalGetUserPossession(uid);
    return res.json({msg: "ok", currentBalance: balanceData.balance});
};

