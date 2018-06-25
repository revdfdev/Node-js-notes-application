const fs = require('fs');
const yargs = require('yargs');
var lodash = require('lodash');
var notes = require('./notes');

var command = process.argv[2];

var title = {
    describe: 'Title of the note',
    demand: true,
    alias: 't'
};

var body = {
    describe: 'Body of the note',
    demand: true,
    alias: 'b'
}

var arguments = yargs
    .command('add', 'add a new note', {
        title,
        body
    })
    .command('list', 'List all note')
    .command('read', 'Read a note', {
        title
    })
    .command('remove', 'Remove the note', {
        title
    })
    .help(true).argv;

if (command === 'add') {
    var note = notes.addNote(arguments.title, arguments.body);
    if (note !== undefined) {
        console.log(`Added new note`);
        notes.logNote(note);
    }
} else if (command === 'list') {
    var allnotes = notes.getAll();
    if (allnotes.length > 0) {
        console.log(`Printing ${allnotes.length} note(s)`);
        allnotes.forEach(note => notes.logNote(note));
    } else {
        console.log("There are no notes available");
    }
} else if (command === 'read') {
    if (arguments.title === undefined) {
        console.log("No title defined for the note to be read");
    } else {
        var retrievedNote = notes.getNote(arguments.title)[0];
        if (retrievedNote) {
            console.log('note found');
            notes.logNote(retrievedNote);
        } else {
            console.log(`No note found for Title: ${arguments.title}`);
        }
    }
} else if (command === 'remove') {
    var didNoteRemove = notes.removeNote(arguments.title);
    (didNoteRemove)
        ? console.log(`Note with title ${arguments.title} removed`)
        : console.log(`Note with title ${arguments.title} not found`);
} else {
    console.log("Command not recognized");
}