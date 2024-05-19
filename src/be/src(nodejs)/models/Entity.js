export class Entity {
    BASE_ATTACK_VALUE = 100;
    BASE_HEALTH_VALUE = 100;
    BASE_ATTACK_SCALE = 1;
    BASE_HEALTH_SCALE = 1;

    /**
     * a map of all the effects
     *
     * currentEffects['effectX'] = all the instances which give the 'effectX' with their respective
     * duration, which will be reduced by 1 for every turn
     *
     * example:
     * currentEffects['effectX'] = [
     *      {
     *          scalar: 2,
     *          duration: 5
     *      },
     *      ...
     *      {
     *          scalar: 1.1,
     *          duration: -1 (until the end of the game)
     *      }
     * ]
     *
     */
    currentEffects = {};

    constructor(name) {
        this.name = name;
        this.hitPoints = this.BASE_HEALTH_VALUE * this.BASE_HEALTH_SCALE;
        this.damage = this.BASE_ATTACK_VALUE * this.BASE_ATTACK_SCALE;
        this.alive = true;
    }
    revaluate() {
        this.hitPoints = this.BASE_HEALTH_VALUE * this.BASE_HEALTH_SCALE;
        this.damage = this.BASE_ATTACK_VALUE * this.BASE_ATTACK_SCALE;
    }
    toJSON() {
        return {
            name: this.name,
            status: (this.alive) ? "alive" : "dead",
            hitPoints: this.hitPoints,
            damage: this.damage,
            currentEffects: this.currentEffects,
        };
    }
    get getEffects() {
        return this.currentEffects;
    }
    addBuff(buff) {
        const effects = buff.effects;
        effects.forEach((effect) => {
            if (!this.currentEffects[effect.type]) {
                this.currentEffects[effect.type] = [];
            }
            this.currentEffects[effect.type].push({
                scalar: effect.scalar,
                duration: effect.duration,
            });
        });
    }

    /**
     * Stats will always be represented as: BASE*SCALE*(something).
     * The difference in how "something" was calculated will result in different type of effect.
     */
    calculateStats() {
        for (const effect in this.currentEffects) {
            if (effect === "atk-reinforce") {
                this.BASE_ATTACK_SCALE = this.BASE_ATTACK_SCALE*effect.scalar;
            } else {
                this.BASE_ATTACK_SCALE = this.BASE_HEALTH_SCALE*effect.scalar*effect.scalar;
            }
        }
        this.revaluate();
    }
}
