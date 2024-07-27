const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
    origin: 'https://amaginelost.github.io', // Allow requests from your GitHub Pages domain
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

let scripts = [];

fs.readFile('scripts.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading scripts.json:', err);
        return;
    }
    scripts = JSON.parse(data);
});

app.get('/api/scripts', (req, res) => {
    res.json(scripts);
});

app.post('/api/scripts', (req, res) => {
    scripts = req.body;
    fs.writeFile('scripts.json', JSON.stringify(scripts, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Error writing to scripts.json:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.status(200).send('Scripts updated successfully');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

