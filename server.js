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