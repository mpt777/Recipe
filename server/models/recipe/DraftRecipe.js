import { Schema, model } from 'mongoose';

const RecipeSchema = new Schema({
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    image:{
        type: Schema.Types.ObjectId, 
        ref: 'image'
    }
})

export const DraftRecipe = model('draftRecipe', RecipeSchema)