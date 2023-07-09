import { Schema, model } from 'mongoose';

const IngredientSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
        enum: ["cup", "teaspoon","tablespoon","pint","quart","gallon","ounce","fluid ounce","pound","milliliter","liter","gram","kilogram"]
    },
    recipe: {
        type: Schema.Types.ObjectId, 
        ref: 'Ingredient'
    }
})

export const ingredient = model('ingredient', IngredientSchema)