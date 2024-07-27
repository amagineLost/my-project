const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let scripts = [];

fs.readFile('scripts.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading scripts.json:', err);
        return;
    }
    try {
        scripts = JSON.parse(data);
    } catch (parseErr) {
        console.error('Error parsing scripts.json:', parseErr);
    }
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

