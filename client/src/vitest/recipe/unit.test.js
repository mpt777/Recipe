import { UnitConverter, Cup, FluidOunce, Gram, Liter, Milliliter, Ounce, Pint, Pound, System } from '$components/recipe/Ingredient';
import { describe, it, expect } from 'vitest';

describe("conversion test", () => {
	it("Cup to Mililiter", () => {
		expect(UnitConverter.convertAmount(Cup, Milliliter, 2)).toBe(480);
	})
	it("Cup to Liter", () => {
		expect(UnitConverter.convertAmount(Cup, Liter, 2)).toBe(0.48);
	})
	it("Ounce to Pound", () => {
		expect(UnitConverter.convertAmount(Ounce, Pound, 3)).toBe(0.1875);
	})
	it("Pint to FluidOunce", () => {
		expect(UnitConverter.convertAmount(Pint, FluidOunce, 3)).toBe(48);
	})
})

// describe("conversion system test", () => {
// 	it("Cup to Metric", () => {
// 		expect(UnitConverter.convertUnit(Cup, System.Metric)).toBe(Milliliter);
// 	})
// 	it("Gram to Gram", () => {
// 		expect(UnitConverter.convertUnit(Gram, System.Metric)).toBe(Gram);
// 	})
// 	it("Gram to Ounce", () => {
// 		expect(UnitConverter.convertUnit(Gram, System.US)).toBe(Ounce);
// 	})
// })