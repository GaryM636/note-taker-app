const express = require('express');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/notes', function(req, res){
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('/api/notes', function(req, res){
    const dbPath = path.join(__dirname, 'db', 'db.json');
    const existingNotes = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    res.json(existingNotes);
});

//function to save notes

app.post('/api/notes', function(req, res){
    const dbPath = path.join(__dirname, 'db', 'db.json');
    const existingNotes = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    const newNote = {
        id: existingNotes.length ? Math.max(...existingNotes.map(note => note.id)) + 1 : 1,
        title: req.body.title,
        text: req.body.text
    };

    existingNotes.push(newNote);

    fs.writeFileSync(dbPath, JSON.stringify(existingNotes, null, 2));

    res.json(newNote);
    getAndRenderNotes();
});

function getAndRenderNotes() {
    const dbPath = path.join(__dirname, 'db', 'db.json');
    const existingNotes = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

//function to delete notes using note id

app.delete('/api/notes/:id', function(req, res){
    const dbPath = path.join(__dirname, 'db', 'db.json');
    const existingNotes = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    const noteId = req.params.id;

    const updatedNotes = existingNotes.filter(note => note.id !== Number(noteId));

    fs.writeFileSync(dbPath, JSON.stringify(updatedNotes, null, 2));

    res.json(updatedNotes);
    getAndRenderNotes();
});

app.listen(port, () => {
    console.log(`app running on http://localhost:${port}`);
});

