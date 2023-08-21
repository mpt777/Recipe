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
        required: true,
    },
    image:{
        type: Schema.Types.ObjectId, 
        ref: 'Image'
    },
    createdBy:{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    prepTime: {
        type: Number,
        required: true, 
    },
    cookTime: {
        type: Number,
        required: true,
    },
    servings: {
        type: Number,
        required: true
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
    ref: 'ingredient',
    localField: '_id',
    foreignField: 'recipe'
});

RecipeSchema.pre('findOneAndDelete', function(next){_deleteRelated(next, this)})
RecipeSchema.pre('deleteOne', function(next){_deleteRelated(next, this)})
RecipeSchema.pre('deleteMany', function(next){_deleteRelated(next, this)})


// RecipeSchema.methods.ingredients = async function() {
//     const ingredients = await Ingredient.find().where('recipe').equals(this._id)
//     return ingredients
// }

export const Recipe = model('recipe', RecipeSchema)