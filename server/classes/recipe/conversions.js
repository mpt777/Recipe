class Conversion {
    constructor(unit_from, unit_to, ratio) {
        this.unit_from = unit_from;
        this.unit_to = unit_to;
        this.ratio = ratio;
    }

    convert_forward(amount) {
        return amount * this.ratio;
    }

    convert_backward(amount) {
        return amount / this.ratio;
    }
}