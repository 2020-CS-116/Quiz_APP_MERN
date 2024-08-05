import mongoose from "mongoose";
const { Schema } = mongoose;

/** question model */
const questionSchema = new Schema({
    questions: [{
        id: Number,
        question: String,
        options: [String]
    }],
    answers: [Number], // Index of the correct answer
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Question', questionSchema);
