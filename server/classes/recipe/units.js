const System = {
	Imperial: Symbol("imperial"),
	Metric: Symbol("metric"),
}

const State = {
	Solid: Symbol("solid"),
	Liquid: Symbol("liquid"),
}

class Unit {
    constructor(title, abbreviation, system, tags) { // state
        this.title = title;
        this.abbreviation = abbreviation;
        this.system = system;
        // this.state = state;
        this.tags = tags;
    }
}

class Cup extends Unit {
    constructor(){
        super("cup", "c", System.Imperial, State.Solid)
    }
}

class Teaspoon extends Unit {
    constructor(){
        super("teaspoon", "tsp", System.Imperial)
    }
}

class Tablespoon extends Unit {
    constructor(){
        super("tablespoon", "tbsp", System.Imperial)
    }
}

class Pint extends Unit {
    constructor(){
        super("pint", "pt", System.Imperial)
    }
}

class Quart extends Unit {
    constructor(){
        super("quart", "qt", System.Imperial)
    }
}

class Gallon extends Unit {
    constructor(){
        super("gallon", "gal", System.Imperial)
    }
}

class Ounce extends Unit {
    constructor(){
        super("ounce", "oz", System.Imperial)
    }
}

class FluidOunce extends Unit {
    constructor(){
        super("fluid ounce", "fl oz", System.Imperial)
    }
}

class Pound extends Unit {
    constructor(){
        super("pound", "lb", System.Imperial)
    }
}

//-----------------------------------------

class Milliliter  extends Unit {
    constructor(){
        super("milliliter", "ml", System.Metric)
    }
}

class Liter extends Unit {
    constructor(){
        super("liter", "l", System.Metric)
    }
}

class Gram extends Unit {
    constructor(){
        super("gram", "g", System.Metric)
    }
}

class Kilogram extends Unit {
    constructor(){
        super("kilogram", "k", System.Metric)
    }
}