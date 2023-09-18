import { Schema, model } from 'mongoose';

export const TimeSchema = new Schema({
    amount: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
        enum:["hour","minute","second"],
    },
})