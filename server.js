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
    const db = require('./db/db.json');
    res.json(db);
}); // ask about why this rendered correctly



app.post('/api/notes', function(req, res){
    
})


app.listen(port, ()=> console.log(`app running on http://localhost:${port}`));