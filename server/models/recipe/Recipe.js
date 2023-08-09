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
        ref: 'Image'
    },
    createdBy:{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
})

export const Recipe = model('recipe', RecipeSchema)