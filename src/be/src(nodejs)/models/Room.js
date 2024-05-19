export class Room {
    constructor(roomId, ownerId, name, description, difficulty, testId, questionNum) {
        this.roomId = roomId;
        this.ownerId = ownerId;
        this.name = name;
        this.description = description;
        this.difficulty = difficulty;
        this.testId = testId;
        this.questionNum = questionNum;
    }
    toJSON() {
        return {
            "rid": this.roomId, // Room's id (string)
            "owner": this.ownerId, // Owner of the room (creator) (string)
            "name": this.name || "", // Name of the room (string)
            "desc": this.description || "", // Description of the room (string)
            "diff": this.difficulty || 0, // Difficulty of the game (integer)
            "tframe": parseInt(this.tframe) || 30, // Maximum time allowed to answer a question (integer - second)
            "testId": this.testId || "", // Id of the test saved locally (string)
            "qNum": parseInt(this.questionNum) || 0, // Number of question (integer)
            "ended": this.ended || false, // Is this room ended (boolean)
        };
    }
}
