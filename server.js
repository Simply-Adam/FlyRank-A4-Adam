require('dotenv').config();

const express = require('express');
const supabase = require('./supabase');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.json({
        message: 'Auth API is running'
    });
});


// start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Connected to Supabase');
});