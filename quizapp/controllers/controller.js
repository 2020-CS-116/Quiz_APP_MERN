import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import questionsData, { answers } from '../database/data.js';

/** Get all questions */
export async function getQuestions(req, res) {
    try {
        let q = await Questions.findOne();
        if (!q) {
            await Questions.create({ questions: questionsData, answers });
            q = await Questions.findOne();
        }
        res.json(q);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/** Insert all questions */
export async function insertQuestions(req, res) {
    try {
        await Questions.deleteMany(); // Clear existing questions
        await Questions.create({ questions: questionsData, answers });
        res.status(201).json({ msg: "Questions Inserted Successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/** Delete all questions */
export async function dropQuestions(req, res) {
    try {
        await Questions.deleteMany();
        res.json({ msg: "Questions Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/** Get all results */
export async function getResult(req, res) {
    try {
        const r = await Results.find();
        res.json(r);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/** Store result */
export async function storeResult(req, res) {
    try {
        const { username, result, attempts, points, achived } = req.body;
        if (!username || !result) throw new Error('Data Not Provided');

        const newResult = await Results.create({ username, result, attempts, points, achived });
        res.status(201).json({ msg: "Result Saved Successfully", result: newResult });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/** Delete all results */
export async function dropResult(req, res) {
    try {
        await Results.deleteMany();
        res.json({ msg: "Results Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
