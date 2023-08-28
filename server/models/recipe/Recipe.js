import { Schema, model } from 'mongoose';
import { Ingredient } from './Ingredient.js';

const RecipeSchema = new Schema({
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    instructions: {
        type: String,
        required: false,
    },
    image:{
        type: Schema.Types.ObjectId, 
        ref: 'Image',
        required: false,
    },
    createdBy:{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    tags:[{
        type: Schema.Types.ObjectId, 
        ref: 'Tag'
    }],
    prepTime: {
        type: Number,
        required: false, 
    },
    cookTime: {
        type: Number,
        required: false,
    },
    servings: {
        type: Number,
        required: true,
        default: 1,
    }
},
{ 
    timestamps: true, 
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
)

async function _deleteRelated(next, schema) {
    const doc = await schema.model.findOne(schema.getFilter());
    Ingredient.deleteMany({recipe: doc._id}).exec();
    next()
}
RecipeSchema.virtual('ingredients', {
    ref: 'Ingredient',
    localField: '_id',
    foreignField: 'recipe'
});

RecipeSchema.pre('findOneAndDelete', function(next){_deleteRelated(next, this)})
RecipeSchema.pre('deleteOne', function(next){_deleteRelated(next, this)})
RecipeSchema.pre('deleteMany', function(next){_deleteRelated(next, this)})

export const Recipe = model('Recipe', RecipeSchema)