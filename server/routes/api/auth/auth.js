import { Router } from 'express'
import { User } from '../../../models/auth/User.js'
import {authenticateToken, generateAccessToken} from '../../../middleware/auth.js'

export const router = Router()

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user === null) { 
            return res.status(400).send({ 
                message : "User not found."
            }); 
        } 
        else { 
            if (user.validPassword(req.body.password)) { 
                return res.status(201).send({ 
                    token : generateAccessToken(user.username),
                    message : "User Logged In", 
                }) 
            } 
            else { 
                return res.status(400).send({ 
                    message : "Wrong Password"
                }); 
            } 
        } 
    } catch (error){
        res.status(401).json({ message: error.message })
    }
})

router.post('/signup', async (req, res) => {
    try {
        // Creating empty user object 
        let newUser = new User(); 

        // Initialize newUser object with request data 
        newUser.username = req.body.username, 
        newUser.email = req.body.email,

        newUser.password=req.body.password

        // Call setPassword function to hash password 
        newUser.setPassword(req.body.password); 

        // Save newUser object to database 

        const user = await newUser.save() 
        
        return res.status(201).send({ 
            token : generateAccessToken(user.username),
            message : "User Added", 
        }); 
    } catch (error){
        return res.status(400).send({ 
            message : "Failed to add user."
        }); 
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