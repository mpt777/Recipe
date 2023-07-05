import { Router } from 'express'
import { User } from '../../../models/auth/User.js'
import {authenticateToken, generateAccessToken} from '../../../middleware/auth.js'

export const router = Router()

router.post('/login', async (req, res) => {
    try {
        let username = req.body.username;
        let password = req.body.password;
        const user = await User.findOne({ username: username });
        if (!user) throw new Error(`No User Found, ${username} ${password}`);
        if (user.password !== password) throw new Error('Password Incorrect')
        const token = generateAccessToken({ username: username });
        res.status(200).json(token);
    } catch (error) {
        //return next(error);
        res.status(401).json({ message: error.message })
    }
})

router.post('/signup', async (req, res) => {
    const newUser = new User(req.body)
    
    try {
        const user = await newUser.save()
        if (!user) throw new Error('Something went wrong saving')
        const token = generateAccessToken({ username: user.username });
        res.status(200).json(token)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/', async (req, res) => { //authenticateToken
    try {
        const recipeList = await User.find()
        if (!recipeList) throw new Error('No List found')
        res.status(200).json(recipeList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/clear', async (req, res) => {
    try {
        const removed = await User.deleteMany()
        res.status(200).json({ message: "Deleted All Users" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const recipe = await User.findById(id)
        if (!recipe) throw new Error('No Recipe found')
        res.status(200).json(recipe)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await User.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})