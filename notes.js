const fs = require('fs');

var fetchNote = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (err) {
        return [];
    }
};

var saveNotes = notes => fs.writeFileSync('notes-data.json', JSON.stringify(notes));

var addNote = (title, body) => {
    var notes = fetchNote();
    var note = {
        title,
        body
    };
    var duplicateNotes = notes.filter(note => note.title === title);
    if (duplicateNotes.length > 0) {
        console.log(`Note with ${title} already exists`);
    } else {
        notes.push(note);
        saveNotes(notes);
        return note;
    }

}

var getAll = () => {
    return fetchNote();
}

var getNote = title => {
    var notes = fetchNote(title);
    if (notes.length > 0) {
        return notes.filter(note => note.title === title);
    } else {
        return undefined;
    }
}

var removeNote = (title) => {
    var notes = fetchNote();
    if (notes.length > 0) {
        var newNotes = notes.filter(note => note.title !== title);
        saveNotes(newNotes);
        return true;
    } else {
        return false;
    }

}

var logNote = note => {
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
    console.log("-----");
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote

}