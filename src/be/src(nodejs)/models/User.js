export class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    // getters
    toJSON() {
        return {
            id: this.id,
            name: this.name,
        };
    }
    // setters
    set setName(name) {
        this.name = name;
    }
}
