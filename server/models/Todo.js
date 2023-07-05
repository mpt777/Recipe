import { Schema, model } from 'mongoose'

const TodoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
})

export const Todo = model('todo', TodoSchema)