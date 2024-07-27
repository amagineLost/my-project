const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Load scripts from a JSON file
let scripts = JSON.parse(fs.readFileSync('scripts.json', 'utf8'));

// Endpoint to get scripts
app.get('/api/scripts', (req, res) => {
    res.json(scripts);
});

// Endpoint to update scripts
app.post('/api/scripts', (req, res) => {
    scripts = req.body;
    fs.writeFileSync('scripts.json', JSON.stringify(scripts, null, 2));
    res.status(200).send('Scripts updated');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

