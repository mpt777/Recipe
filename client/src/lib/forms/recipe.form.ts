import { z } from "zod";

export const recipeSchema = z.object({
    title: z.string().min(2),
    handle: z.string(),
    description: z.string().min(0),
    instructions: z.string().min(1),
    ingredients: z.object({
        _id: z.string(),
        title: z.string().min(1),
        amount: z.coerce.number().positive(),
        unit: z.enum(["cup", "teaspoon","tablespoon","pint","quart","gallon","ounce","fluid ounce","pound","milliliter","liter","gram","kilogram"]),
        recipe: z.string(),
        delete: z.boolean().default(false),
    }).array().min(0),
    tags: z.string().min(0).array(),
    servings: z.coerce.number().min(1),
    cookTime: z.object({
        amount: z.coerce.number().positive(),
        unit: z.enum(["hour", "minute", "second"]),
    }),
    prepTime: z.object({
        amount: z.coerce.number().positive(),
        unit: z.enum(["hour", "minute", "second"]),
    })
    
})