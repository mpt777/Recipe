import { Router } from 'express'
import { Recipe } from '../../../models/recipe/Recipe.js'
import {authenticateToken, generateAccessToken} from '../../../middleware/auth.js'
import { Ingredient } from '../../../models/recipe/Ingredient.js'
import { namesToIds } from '../../../models/recipe/Tag.js'

import {responseErrorHandler} from '../../../errors/errorHandler.js'
import {slugify} from '../../../utils/humanize.js'


export const router = Router()

router.get('/', async (req, res) => {
    try {
        const query = Recipe.find().populate(["createdBy", "ingredients", "tags"])

        const parameters = req.query;

        if (parameters.createdBy) {
            query.where('createdBy').equals(parameters.createdBy);
        }
        let recipeList = await query.exec();

        if (!recipeList) throw new Error('No List found')
        res.status(200).json(recipeList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const recipe = await Recipe.findByHandleOrId(id)
        if (!recipe) throw new Error('No Recipe found')
        res.status(200).json(await recipe.populate(["createdBy", "ingredients", "tags", "image"]))
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params
    try {
        if (req.body?.tags){
            req.body.tags = await namesToIds(req.body.tags)
        }
        if (req.body?.handle){
            req.body.handle = slugify(req.body.handle)
        }

        let recipe = await Recipe.findByHandleOrId(id)

        recipe = await Recipe.findByIdAndUpdate(recipe._id, req.body)
        if (!recipe) throw Error('Something went wrong ')

        recipe.populate("tags")
        res.status(200).json(recipe)
    } catch (error) {
        res.status(500).json(responseErrorHandler(error))
    }
})

router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params
    try {
        const recipe = await Recipe.findByHandleOrId(id)

        const removed = await Recipe.findByIdAndDelete(recipe._id, req.body)
        // const removed = await Recipe.findById(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', authenticateToken, async (req, res) => {
    const newR = new Recipe(req.body)
    try {
        const recipe = await newR.save()
        if (!recipe) throw new Error('Something went wrong saving')
        res.status(200).json(recipe)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
