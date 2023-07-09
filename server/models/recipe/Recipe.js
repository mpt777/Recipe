import { Schema, model } from 'mongoose';

const RecipeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image:{
        type: Schema.Types.ObjectId, 
        ref: 'image'
    }
})

export const Recipe = model('recipe', RecipeSchema)