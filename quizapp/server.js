// server.js

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import router from './router/router.js';
import connect from './database/conn.js';

config(); // Load environment variables

const app = express();

app.use(morgan('tiny')); // Log HTTP requests
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

const port = process.env.PORT || 5000;

app.use('/api', router); // Route API requests to the router

app.get('/', (req, res) => {
    try {
        res.json("Get Request");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

connect().then(() => {
    app.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`);
    });
}).catch(error => {
    console.error("Invalid Database Connection:", error);
});
