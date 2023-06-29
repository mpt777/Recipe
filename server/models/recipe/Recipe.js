const { Schema, model } = require('mongoose')

const RecipeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
})

const Recipe = model('recipe', RecipeSchema)

module.exports = Recipe