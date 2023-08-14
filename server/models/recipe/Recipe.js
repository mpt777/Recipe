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
        ref: 'Image'
    },
    createdBy:{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
},
{ timestamps: true }
)

RecipeSchema.virtual('ingredients', {
    ref: 'ingredient',
    localField: '_id',
    foreignField: 'recipe'
});

export const Recipe = model('recipe', RecipeSchema)