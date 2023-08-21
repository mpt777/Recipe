import type { Type } from "typescript";

const System = {
	Imperial: Symbol("imperial"),
	Metric: Symbol("metric"),
}

const State = {
	Solid: Symbol("solid"),
	Liquid: Symbol("liquid"),
}

abstract class Unit {
    title!: string;
    abbreviation!:string;
    system!: symbol;
    tags?: symbol[];
    value: number;
    ratio!: number;
    conversion!:typeof Unit;

    constructor(value:number) {
        this.value = value;
    }

    toMetric(value:number):number {
        if (this.system == System.Metric) {
            return this.value
        }
        return this.value * this.ratio
    }
    toImperial(value:number):number {
        if (this.system == System.Imperial) {
            return this.value
        }
        return this.value * this.ratio
    }

}

class Cup extends Unit {
    title="cup";
    abbreviation="c";
    system=System.Imperial;
    tags=[State.Solid];
    ratio=250;
    conversion=Milliliter;
}

class Teaspoon implements Unit {
    title="teaspoon";
    abbreviation="tsp";
    system=System.Imperial;
}

class Tablespoon implements Unit {
    title="tablespoon";
    abbreviation="tbsp";
    system=System.Imperial;
}

class Pint implements Unit {
    title="pint";
    abbreviation="pt";
    system=System.Imperial;
}

class Quart implements Unit {
    title="quart";
    abbreviation="qt";
    system=System.Imperial;
}

class Gallon implements Unit {
    title="gallon";
    abbreviation="gal";
    system=System.Imperial;
}

class Ounce implements Unit {
    title="ounce";
    abbreviation="ounce";
    system=System.Imperial;
}

class FluidOunce implements Unit {
    title="fluid ounce";
    abbreviation="fl oz";
    system=System.Imperial;
}

class Pound implements Unit {
    title="pound";
    abbreviation="lb";
    system=System.Imperial;
}

//-----------------------------------------

class Milliliter extends Unit {
    title="milliliter";
    abbreviation="ml";
    system=System.Metric;
    ratio=1/250;
    conversion=Cup;
}

class Liter implements Unit {
    title="liter";
    abbreviation="l";
    system=System.Metric;
}

class Gram implements Unit {
    title="gram";
    abbreviation="g";
    system=System.Metric;
}

class Kilogram implements Unit {
    title="kilogram";
    abbreviation="k";
    system=System.Metric;
}

//--------------------------------------------------

export class Ingredient {
    ingredient : IngrdientInterface;
    unit: Unit;

    constructor(ingredient : IngrdientInterface) {
        this.ingredient = ingredient;
        this.unit = new Cup(parseFloat(ingredient.amount));
    }
}
