import express from 'express'
const app = express()
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'

import { router as TodoListRoutes } from './routes/api/todolist.js'
import { router as RecipeRoutes } from './routes/api/recipe/recipe.js'
import { router as AuthRoutes } from './routes/api/auth/auth.js'
import { router as ImageRoutes } from './routes/api/image/image.js'
import { fileURLToPath } from 'url';

import path from 'path'

import dotenv from 'dotenv';

global.appRoot = path.dirname(fileURLToPath(import.meta.url));

dotenv.config()

app.use(cors())
app.use(bodyParser.json())

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then(() => console.log('MongoDB database Connected...'))
    .catch((err) => console.log(err))

app.use('/api/todoList', TodoListRoutes)
app.use('/api/recipe', RecipeRoutes)
app.use('/api/auth', AuthRoutes)
app.use('/api/image', ImageRoutes)

app.listen(process.env.PORT, () => console.log(`App listening at http://localhost:${process.env.PORT}`))