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

//sign up
app.post('/auth/signup', async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: 'Email and password are required'
        });
    }

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    });

    if (error) {
        return res.status(400).json({
            error: error.message
        });
    }

    res.status(201).json({
        user: data.user
    });
});


//log in
app.post('/auth/login', async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: 'Email and password are required'
        });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        return res.status(401).json({
            error: 'Invalid login credentials'
        });
    }

    res.status(200).json({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token
    });
});


// start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Connected to Supabase');
});