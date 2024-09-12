const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Handle GET request for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Handle POST request for form submission
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    // Save the user data to a file
    const userData = `${username}, ${email}, ${password}\n`;
    fs.appendFileSync('user-data.txt', userData);

    res.send('Signup successful!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
