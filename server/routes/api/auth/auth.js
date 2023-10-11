import { Router } from 'express'
import { User } from '../../../models/auth/User.js'
import {authenticateToken, generateAccessToken} from '../../../middleware/auth.js'
import { mailTransporter } from '../../../utils/email.js'
import crypto from 'crypto'; 

export const router = Router()

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username }).select(['+salt','+hash']);
        if (user === null) { 
            return res.status(400).send({ 
                message : "User not found."
            }); 
        } 
        else { 
            if (user.validPassword(req.body.password)) { 
                return res.status(201).send({ 
                    token : generateAccessToken(user.cleanJSON()),
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
            token : generateAccessToken(user),
            message : "User Added", 
        }); 
    } catch (error){
        return res.status(400).send({ 
            message : "Failed to add user."
        }); 
    }
})

router.post('/forgot-password', async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({email: email})
        if (!user) throw Error("Np User Found")
            //Get reset token
        const resetToken = user.getResetPasswordToken();

        await user.save({validateBeforeSave: false })

        const resetUrl =`${req.protocol}://localhost:8080/auth/reset-password/${resetToken}`;
        const mailDetails = {
            from: 'mptaylor777@gmail.com',
            to: user.email,
            subject: 'Reset Password',
            html: `
            <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Password Reset</title>
                </head>
                <body>
                    <p>Hi!</p>
                    
                    <p>You have requested to reset your password. To proceed, please click the link below:</p>
                    
                    <p><a href="${resetUrl}">Reset My Password</a></p>
                    
                    <p>If you did not initiate this password reset request, please ignore this email.</p>
                    
                    <p>Best,</p>
                    <p>The Calyps.io Team</p>
                </body>
                </html>`
        };

        mailTransporter.sendMail(mailDetails)
        res.status(200).json({"message":"email sent"})
    } catch (error) {
        res.status(200)
        // res.status(500).json({ message: error.message })
    }
})

router.post('/reset-password', async (req, res) => { //authenticateToken
    try {
        const token = req.body.token;

        const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex')

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
    
        })

        user.setPassword(req.body.password); 

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
    
        await user.save();

        res.status(200).json({ message: ""})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


router.get('/user', async (req, res) => { //authenticateToken
    try {
        const recipeList = await User.find()
        if (!recipeList) throw new Error('No List found')
        res.status(200).json(recipeList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/user/clear', async (req, res) => {
    try {
        const removed = await User.deleteMany()
        res.status(200).json({ message: "Deleted All Users" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/user/current', authenticateToken, async (req, res) => { //authenticateToken
    try {
        const recipe = await User.findById(req.user._id)
        if (!recipe) throw new Error('No Recipe found')
        res.status(200).json(recipe)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/user/:id', async (req, res) => {
    const { id } = req.params
    try {
        const recipe = await User.findById(id)
        if (!recipe) throw new Error('No Recipe found')
        res.status(200).json(recipe)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/user/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await User.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})