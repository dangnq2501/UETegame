export class Effect {
    PERMANENT_DURATION = -1;
    constructor(type, scalar, duration) {
        this.type = type;
        this.scalar = scalar;
        this.duration = duration || this.PERMANENT_DURATION;
    }
}
