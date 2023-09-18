const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // using UUID for generating unique ID's

const app = express();
const PORT = process.env.PORT || 3000; 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// HTML Routes 

// Route for the homepage 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html')); 
}); 

// Route for the notes page 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// API Routes 

// read and return all saved notes as JSON 
app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err; 
        const notes = JSON.parse(data);
        res.json(notes);
    });
});

// Route to recieve a new note, add it to db.json and return the new note 

app.post('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err; 
        const notes = JSON.parse(data);

        const newNote = {
            id: uuidv4(), 
            title: req.body.title, 
            text: req.body.text, 
        };

        notes.push(newNote);

        fs.writeFile('db/db.json', JSON.stringify(notes), (err) => {
            if (err) throw err; 
            res.json(newNote); 
        });
    });
});

// start the server 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 