import { Router } from 'express'
import { Image } from '../../../models/image/Image.js'

export const router = Router()

router.post('/upload', async (req, res) => {
    try {
        res.status(200).json(token);
    } catch (error) {
        //return next(error);
        res.status(401).json({ message: error.message })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const recipe = await Image.findById(id)
        if (!recipe) throw new Error('No Recipe found')
        res.status(200).json(recipe)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})