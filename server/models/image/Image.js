import { Schema, model } from 'mongoose'

const ImageSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    src: {
        type: String,
        required: true,
    },
})

export const Image = model('image', ImageSchema)