import express from 'express'
import session from 'express-session';
const app = express()
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'

import { router as IngredientRoutes } from './routes/api/recipe/ingredient.js'
import { router as RecipeRoutes } from './routes/api/recipe/recipe.js'
import { router as AuthRoutes } from './routes/api/auth/auth.js'
import { router as ImageRoutes } from './routes/api/image/image.js'

import {initialize } from "./adminjs/initialize.js"

import { fileURLToPath } from 'url';

import path from 'path'

import dotenv from 'dotenv';

global.appRoot = path.dirname(fileURLToPath(import.meta.url));

dotenv.config()

app.use(cors())
app.use(express.json());
app.use('/api/v1/recipe/recipe', RecipeRoutes)
app.use('/api/v1/recipe/ingredient', IngredientRoutes)
app.use('/api/v1/common/auth', AuthRoutes)
app.use('/api/v1/common/image', ImageRoutes)

app.use(session({
    secret: process.env.TOKEN_SECRET,
    resave: false,
    saveUninitialized: true,
  }));

const db = await mongoose
.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

initialize(app, db)

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}, AdminJS server started on URL: http://localhost:${process.env.PORT}`)
})