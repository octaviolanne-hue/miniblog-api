const { loadEnvFile } = require('node:process');
const express = require('express');

if (process.env.NODE_ENV !== 'production') {
    loadEnvFile('.env');
}

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// routes...

app.listen(PORT, () => {
    
});