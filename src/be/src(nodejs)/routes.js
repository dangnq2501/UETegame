const homeCtrl = require("./controllers/homeController");
const userCtrl = require("./controllers/userController");
const roomCtrl = require("./controllers/roomController");
const gameCtrl = require("./controllers/gameController");
const possCtrl = require("./controllers/possessionController");
const shopCtrl = require("./controllers/shopController");
const groupCtrl = require("./controllers/groupController");
const objCtrl = require("./controllers/frontEndObjectController");
export const initWebRoutes = (app) => {
    app.route("/")
        .get(homeCtrl.getHomePage);

    app.route("/user/get")
        .post(userCtrl.getUserInfo);

    app.route("/user/update")
        .post(userCtrl.setUserInfo);

    app.route("/user/init")
        .post(userCtrl.initRegisterUser);

    app.route("/room/create")
        .post(roomCtrl.createRoom);

    app.route("/room/update")
        .post(roomCtrl.updateRoom);

    app.route("/room/delete")
        .post(roomCtrl.deleteRoom);

    app.route("/room/join")
        .post(roomCtrl.joinRoom);

    app.route("/room/leave")
        .post(roomCtrl.leaveRoom);

    app.route("/room/userlist")
        .post(roomCtrl.getRoomUserList);

    app.route("/room/get")
        .post(roomCtrl.getRoomInfo);

    app.route("/game/get")
        .post(gameCtrl.getGameStatus);

    app.route("/game/summary")
        .post(gameCtrl.getSummaryAfterGame);

    app.route("/game/context/get")
        .post(gameCtrl.getGameContext);

    app.route("/game/context/post")
        .post(gameCtrl.postGameContext);

    app.route("/storage/get")
        .post(possCtrl.getUserPossession);

    app.route("/storage/update")
        .post(possCtrl.updateUserBalance);

    app.route("/shop")
        .post(shopCtrl.getShop);

    app.route("/shop/buy")
        .post(shopCtrl.buyItem);

    app.route("/group")
        .post(groupCtrl.getGroup);

    app.route("/group/properties")
        .post(groupCtrl.getGroupProperties);

    app.route("/group/create")
        .post(groupCtrl.createGroup);

    app.route("/group/delete")
        .post(groupCtrl.deleteGroup);

    app.route("/group/members/add")
        .post(groupCtrl.groupAddMember);

    app.route("/group/rooms/create")
        .post(groupCtrl.groupAddNewRoom);

    app.route("/group/rooms/add")
        .post(groupCtrl.groupAddExistingRoom);

    app.route("/group/ranking")
        .post(groupCtrl.groupGetRanking);

    app.route("/group/all")
        .post(groupCtrl.getGroupInfoList);

    app.route("/group/all/rooms")
        .post(groupCtrl.getALlGroupsRooms);

    app.route("/object/get")
        .post(objCtrl.getObject);

    app.route("/object/post")
        .post(objCtrl.postObject);
};
