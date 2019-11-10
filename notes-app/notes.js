const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => loadNotes();

const addNotes = (title, body) => {
  const notes = loadNotes();
  const isDublicate = notes.some(note => note.title === title);

  if (!isDublicate) {
    notes.push({
      title,
      body
    });
    saveNotes(notes);
    console.log(chalk.green.inverse('Note was added'));
  } else {
    console.log(chalk.red.inverse('Note title taken'));
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const removeNote = title => {
  const notes = loadNotes();
  const noteId = notes.findIndex(note => note.title === title);

  if (noteId > -1) {
    notes.splice(noteId, 1);
    saveNotes(notes);
    console.log(chalk.green.inverse('Note was removed'));
  } else {
    console.log(chalk.red.inverse('Note not found'));
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.yellow.inverse('Your notes'));
  notes.forEach(note => console.log(chalk.green.inverse(note.title)));
};

const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(n => n.title === title);

  if (note) {
    console.log(chalk.green.inverse(note.title));
    console.log(chalk.green(note.body));
  } else {
    console.log(chalk.red.inverse('Note not found'));
  }
};

module.exports = { getNotes, addNotes, removeNote, listNotes, readNote };
