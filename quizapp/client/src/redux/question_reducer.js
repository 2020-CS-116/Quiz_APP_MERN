import { createSlice } from "@reduxjs/toolkit";

/** create reducer */
export const questionReducer = createSlice({
    name: "questions",
    initialState: {
        queue: [], // Should be an array of questions
        answers: [], // Should be an array of answers
        trace: 0, // Index of the current question
    },
    reducers: {
        startExamAction: (state, action) => {
            const { question, answers } = action.payload;
            // Assuming question is an array of questions and answers is an array of answers
            state.queue = question;
            state.answers = answers;
            state.trace = 0; // Start from the first question
        },
        moveNextAction: (state) => {
            if (state.trace < state.queue.length - 1) {
                state.trace += 1; // Move to the next question if available
            }
        },
        movePrevAction: (state) => {
            if (state.trace > 0) {
                state.trace -= 1; // Move to the previous question if available
            }
        },
        resetAllAction: (state) => {
            state.queue = [];
            state.answers = [];
            state.trace = 0;
        },
    },
});

export const {
    startExamAction,
    moveNextAction,
    movePrevAction,
    resetAllAction,
} = questionReducer.actions;

export default questionReducer.reducer;
