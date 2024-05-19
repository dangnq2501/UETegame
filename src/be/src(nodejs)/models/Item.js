/*
    Item: The fundamental objects which users can possess
    Item's property:
    - id: This act as item's identifier, and it's unique
    - type: For now there is only 1 type: "skin"
    - cost: Cost, obviously
    - description: Item's description
*/

export class Item {
    constructor(name, type, cost, description) {
        this.name = name;
        this.type = type;
        this.cost = cost;
        this.description = description;
    }

    toJSON() {
        return {
            name: this.name,
            type: this.type,
            cost: this.cost,
            description: this.description,
        };
    }

    set setName(name) {
        this.name = name;
    }
    set setType(type) {
        this.type = type;
    }
    set setCost(cost) {
        this.cost = cost;
    }
    set setDescription(description) {
        this.description = description;
    }
}
