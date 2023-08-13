const yargs = require('yargs');
const notes = require('./notes');

//create add command : node .\app.js add --title="buy" --body="soap,brush" 
yargs.command({
    command:'add',
    describe : 'Add a new note',
    builder : {
        title : {
            describe : 'add title to note',
            demandOption : true,
            type : 'string',
        },
        body : {
            describe : 'add body of note',
            demandOption : true,
            type : 'string',
        },
    },
    handler : function (argv){
        notes.addNote(argv.title, argv.body);
    }
});

//create remove command : node .\app.js remove --title='buy'
yargs.command({
    command : 'remove',
    describe : 'remove note',
    builder : {
        title:{
            describe:'title to delete note',
            type:'string',
            demandOption:true,
        }
    },
    handler: function(argv){
        notes.removeNote(argv.title);
    }
});

//create command to list all notes : node .\app.js list
yargs.command({
    command:'list',
    describe:'list the notes',
    handler: function (){
        notes.listNote();
    }
});

//create command to read note with title
yargs.command({
    command:'read',
    describe:'read notes',
    builder : {
        title:{
            describe:'title to read',
            demandOption:true,
            type:'string',
        }
    },
    handler: function (argv){
        notes.readNote(argv.title);
    }
});

yargs.parse();
// console.log(yargs.argv);
