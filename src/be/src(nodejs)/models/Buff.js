export class Buff {
    constructor(id, name, description, effects) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.effects = effects;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            effects: this.effects,
        };
    }
}
