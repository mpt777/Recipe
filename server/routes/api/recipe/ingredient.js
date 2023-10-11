import { Router } from 'express'
import { Ingredient } from '../../../models/recipe/Ingredient.js'
import {authenticateToken, generateAccessToken} from '../../../middleware/auth.js'

export const router = Router()

router.get('/', async (req, res) => {
    try {
        const query = Ingredient.find()

        const parameters = req.query;

        if (parameters.recipe) {
            query.where('recipe').equals(parameters.recipe);
        }
        let queryList = await query.exec();

        if (!queryList) throw new Error('No List found')
        res.status(200).json(queryList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const obj = await Ingredient.findById(id)
        if (!obj) throw new Error('No Recipe found')
        res.status(200).json(obj)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params
    try {
        const obj = await Ingredient.findByIdAndUpdate(id, req.body)
        if (!obj) throw Error('Something went wrong ')
        res.status(200).json(obj)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', authenticateToken, async (req, res) => {
    req.body._id = undefined;
    const newObj = new Ingredient(req.body)
    try {
        const obj = await newObj.save()
        if (!obj) throw new Error('Something went wrong saving')
        res.status(200).json(obj)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params
    try {
        const removed = await Ingredient.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})