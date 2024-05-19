export class Course {
    constructor(name, description, data) {
        this.name = name;
        this.description = description;
        // assume the course's data format is the same as live game.
        this.data = data;
    }

    // getters
    toJSON() {
        return {
            name: this.name,
            description: this.description,
            data: this.data,
        };
    }
    // setters
    set setName(name) {
        this.name = name;
    }
    set setDescription(description) {
        this.description = description;
    }
    set setData(data) {
        this.data = data;
    }
}
