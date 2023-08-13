const fs = require("fs");
const chalk = require("chalk");

const getNotes = function () {
  return "getting notes...";
};

const addNote = (title, body) => {
  const notes = loadNotes();
  let duplicateNotes = notes.find((note) => note.title === title);

  if (!duplicateNotes) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log("note added");
  } else {
    console.log("Note title already exists");
  }
};

const removeNote = (title)=>{
    const notes = loadNotes();
    const newNotes = notes.filter(function (note) {return note.title!==title} );
    if(notes.length > newNotes.length){
        saveNotes(newNotes);
        console.log(chalk.yellow.inverse('Note Deleted!'));
    }else{
        console.log(chalk.red.inverse("Note not found!"));
    }
};

const listNote = ()=>{
  const notes = loadNotes();
  notes.forEach((note) => {
    console.log(note);
  });
}

const readNote = (title)=>{
  const notes = loadNotes();
  const note = notes.find((note)=>note.title === title);
  if(note===undefined){
    console.log(chalk.red.inverse('No note found'));
  }else{
    console.log(chalk.red.bold(note.title)+" "+chalk.blue.inverse(note.body));
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote:removeNote,
  listNote:listNote,
  readNote:readNote,
};
