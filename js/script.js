const app = document.getElementById('app');
const addBtn = app.querySelector('.add-note'); // New Tip 

getNotes().forEach((note)=>{
    const noteElement = createNoteElement(note.id,note.content);
    app.insertBefore(noteElement,addBtn);
});

addBtn.addEventListener('click', _ => addNote());

// -------------- get Notes ------------------
function getNotes(){
    return JSON.parse(localStorage.getItem('notes') || '[]'); // Convert JSON  To JavaScript data
}


// --------------- save Notes -------------------
function saveNotes(notes){
    localStorage.setItem('notes',JSON.stringify(notes)); // Convert JavaScript Data to JSON and store it in localstorge
}


// ------------------ Create Note Element ---------------------
function createNoteElement(id,content){
    const element = document.createElement('textarea');
    element.classList.add('note');
    element.value = content;
    element.placeholder = "Empty Note";

    element.addEventListener('change',()=>{
        updateNote(id,element.value)
    });


    element.addEventListener('dblclick',()=>{
        const doDelete = confirm("Are You Sure you want to delete note");
        if(doDelete){
            deleteNote(id,element);
        }
    })

    element.addEventListener("keypress" , (e)=>{
        if(e.key === "Enter") {
            e.preventDefault();
            element.blur()
        }
    });

    return element;
}

//  ---------------------- add Note -------------------------
function addNote(){
    const existsNotes = getNotes();
    const noteObject  = {
        id:Math.floor(Math.random() * 10000),
        content:""
    }; 

    const noteElement = createNoteElement(noteObject.id,noteObject.content);
    app.insertBefore(noteElement,addBtn);
    existsNotes.push(noteObject);
    saveNotes(existsNotes);
}

// ------------------------ Update Note ---------------------------
function updateNote(id,newContent){
    const notes = getNotes(); 
    const targetNote = notes.filter(note => note.id == id)[0];
    targetNote.content = newContent;
    saveNotes(notes);
}


// --------------------- Delete Note -----------------------
function deleteNote(id,element){
    const notes = getNotes().filter(note => note.id != id);
    saveNotes(notes);
    app.removeChild(element);
}