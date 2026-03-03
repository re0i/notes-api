const express = require('express');
const app = express();

app.use(express.json());

let notes = new Map;
let nextId = 1;

// CREATE
app.post('/newNote', (req, res) => {
    let { title, content } = req.body;
    title = title?.trim();
    content = content?.trim();

    // Basic validation
    if (!title || title.length < 3) {
        return res.status(400).json({ 
            error : "Title must be at least 3 characters"
        });
    }

    if (!content || content.length < 10) {
        return res.status(400).json({
            error : "Content must be at least 10 characters"
        });
    }

    const newNote = {
        id: nextId,
        title,
        content,
        createdAt: new Date().toISOString()
    };

    notes.set(nextId, newNote);
    nextId++;

    res.status(201).json({
        message : "Note created successfully",
        count : notes.size,
        data : newNote
    });
});

// GET ALL
app.get('/notes', (req, res) => {
    const allNotes = Array.from(notes.values());

    if (notes.size === 0) {
        return res.status(200).json({
            message : "You don't have any notes. Wanna create one?",
            count : notes.size,
            data : allNotes
        });
    }

    res.status(200).json({
        message : "",
        count : notes.size,
        data : allNotes
    });
});

// GET ONE
app.get('/notes/:id', (req, res) => {
    let id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({
            error : "Invalid ID",
        });
    }

    const note = notes.get(id);
    if (!note) {
        return res.status(404).json({
            error : "Note not found",
        });
    }

    res.status(200).json({
        message : "",
        count : notes.size,
        data : note
    });
});

app.get('/', (req, res) => {
    res.send("We are live");
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

