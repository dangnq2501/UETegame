import {Firestore} from "../config/firebaseInit";
import {addItemToUser, internalUpdateUserBalance} from "./possessionController";
import {Item} from "../models/Item";


export const getShop = async (req, res) => {
    const itemList = {};
    const collection = (await Firestore.collection("shop")
        .get());
    collection.forEach((snapshot) => {
        const doc = snapshot.data();
        itemList[doc.name] = doc;
    });
    return res.json({msg: "ok", itemList: itemList});
};

// param 'item' is in JSON format. Can be passed with toJSON method.
export const addShopItem = (id, item) => {
    Firestore.collection("shop").doc(id).set(
        item,
    ).then(() => {
    });
};

export const removeShopItem = (id) => {
    Firestore.collection("shop").doc(id)
        .delete()
        .then(() => {
            console.log(`item with id=${id} gone`);
        });
};

export const buyItem = async (req, res) => {
    const uid = req.body.uid;
    const item = req.body.data.item;
    const possession = await Firestore.collection("storage")
        .doc(uid)
        .get();

    const currentPossession = possession.data();
    if (currentPossession.items[item]) {
        return res.json({"data": "lol", "msg": "err you already have this item"});
    }

    const itemData = (await Firestore.collection("shop")
        .doc(item)
        .get())
        .data();

    if (currentPossession.balance > itemData.cost) {
        const newItem = new Item(itemData.name, itemData.type, itemData.cost, itemData.description);
        await addItemToUser(uid, {item: item, itemInfo: newItem.toJSON()});
        await internalUpdateUserBalance(uid, "withdraw", itemData.cost);
        return res.json({"data": "lol", "msg": "ok thank for purchasing"});
    } else {
        return res.json({"data": "lol", "msg": "err insufficient balance"});
    }
};


