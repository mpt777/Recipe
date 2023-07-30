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
    name: {
        type: String,
        required: true,
    },
    alt: {
        type: String,
        required: false,
    },
})

export const Image = model('image', ImageSchema)