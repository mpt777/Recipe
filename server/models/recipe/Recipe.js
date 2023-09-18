import { Schema, model } from 'mongoose';
import { Ingredient } from './Ingredient.js';
import { TimeSchema } from "../common/TimeSchema.js"

const RecipeSchema = new Schema({
    title: {
        type: String,
        required: false,
    },
    handle: {
        type: String,
        required: false,
        unique: true,
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
        ref: 'User',
        required:true
    },
    tags:[{
        type: Schema.Types.ObjectId, 
        ref: 'Tag',
        required:true
    }],
    prepTime: {
        type: TimeSchema, 
        required:true
    },
    cookTime: {
        type: TimeSchema, 
        required:true
    },
    servings: {
        type: Number,
        required: true,
        default: 1,
    },
    visibility: {
        type: String,
        required: true,
        default: ["draft"],
        enum: ["draft","private","unlisted","friends","published"]
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

Recipe.findByHandleOrId = async function(handleOrId) {
    try {
        let recipe = await Recipe.findById(handleOrId)
        if (recipe) {
            return recipe
        }
    } catch {

    }
    return await Recipe.findOne({handle: handleOrId})
}

