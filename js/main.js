const body = document.body;
const app = document.getElementById('app');
const addBtn = app.querySelector('.add-note');
const themeColorVal = document.querySelector(".theme-color-value");
addBtn.addEventListener('click',() => addNote());

getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id,note.content); 
    app.insertBefore(noteElement,addBtn)
})

function createNoteElement(id,content){
    const element  = document.createElement('textarea');
    element.classList.add('note');
    element.placeholder = "Type Note";
    element.value = content;

    element.addEventListener('change', () =>{
        updateNote(id,element.value);
        console.log('changing ....')
    });

    element.addEventListener('dblclick',()=> deleteNotes(id,element))

    return element;
}

// Get JSON From Local Storge And convert to Array of JS Objects
function getNotes(){
    return JSON.parse(localStorage.getItem('my-note') || '[]');
}


// Convert JSON to Array of JS Objects
function saveNotes(notes){
    localStorage.setItem('my-note',JSON.stringify(notes))
}


// Create New Note
function addNote(){
    const notes = getNotes();
    const noteObject = {
        id:Math.floor(Math.random() * 10000),
        content:""
    };
    const noteElement = createNoteElement(noteObject.id,noteObject.content);
    app.insertBefore(noteElement,addBtn)
    notes.push(noteObject);
    saveNotes(notes);
}

// Update Content of note
function updateNote(id,newContent){
    const notes = getNotes();
    const noteTarget = notes.filter(note => note.id == id)[0];
    noteTarget.content = newContent ;
    saveNotes(notes);
}

// Delete Notes
function deleteNotes(id,element){
    const notes = getNotes().filter(note => note.id != id);
    console.log(notes);
    app.removeChild(element);
    saveNotes(notes);
}


// Save Color Theme in localStorge and change values
let colorTheme = localStorage.getItem('theme-color') || '#009578';
body.style.backgroundColor = colorTheme;
themeColorVal.value = colorTheme;
themeColorVal.addEventListener('change',()=>{
    localStorage.setItem('theme-color',themeColorVal.value);
    colorTheme = localStorage.getItem('theme-color');
    body.style.backgroundColor = colorTheme;
});