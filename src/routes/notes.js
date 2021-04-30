const express = require('express');

const Note = require('../models/model-note');

const{ isAuthenticated } = require('../helpers/auth');

const router = express.Router();

router.get('/add', isAuthenticated, (req, res) => {
    res.render('notes/new-note');
});

router.post('/new-note', isAuthenticated, async (req, res) => {
    const {title, description} = req.body
    const errors = []
    if(!title) {
        errors.push({text: 'Please write a Title'});
    }
    if(!description) {
        errors.push({text: 'Please write a Description'});
    }
    if(errors.length > 0) {
        res.render(
            'notes/new-note', {
                errors,
                title,
                description
        });
    }else{
        const newNote = new Note({ title, description });
        newNote.user=req.user.id; //agregada para realizar notas para cada usuario
        await newNote.save();
        req.flash('success_msg', 'Note Added Successfully');
        res.redirect('/notes/notes')
    }
});

router.get('/notes', isAuthenticated, async (req, res) => {
    const notes = await Note.find({user:req.user.id})
        .sort({date: 'desc'})
        .lean();
    // console.log(notes.map(note=> note.toJSON()))
    res.render('notes/all-notes', {
        notes
    });
});

router.get('/edit/:id', isAuthenticated, async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    res.render('notes/edit-note', {
        note
    });
});

router.put("/edit-note/:id", isAuthenticated, async (req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description});
    req.flash('success_msg', 'Note Update Successfully');
    res.redirect('/notes/notes');
});

router.delete('/delete/:id', isAuthenticated, async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('delete_msg', 'Note Delete Successfully');
    res.redirect("/notes/notes");
})



module.exports = router;