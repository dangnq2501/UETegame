import {User} from "./User";

export class GroupMember extends User {
    constructor(id, name, overall, data) {
        super(id, name);
        this.overallEvaluation = overall || 0;
        this.data = data || null;
    }

    updateOverallEvaluation(result) {
        this.overallEvaluation += result.points;
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            overallEvaluation: this.overallEvaluation,
            data: this.data,
        };
    }
}
