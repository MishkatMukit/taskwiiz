// // Reference to the notes container
// const notesContainer = document.getElementById('notes-container');
// const noteText = document.getElementById('note-text');
// const addNoteButton = document.getElementById('add-note-button');

// // Function to add a note
// function addNote() {
//     const noteContent = noteText.value.trim();

//     // Check if the note is empty
//     if (noteContent === '') {
//         alert('Please write something to add a note.');
//         return;
//     }

//     // Create a note card
//     const noteCard = document.createElement('div');
//     noteCard.className = 'note-card';

//     // Add note content
//     const noteParagraph = document.createElement('p');
//     noteParagraph.textContent = noteContent;
//     noteCard.appendChild(noteParagraph);

//     // Add remove button
//     const removeButton = document.createElement('button');
//     removeButton.className = 'remove-button';
//     removeButton.textContent = 'Remove';
//     removeButton.addEventListener('click', () => {
//         noteCard.remove();
//         saveNotes();
//     });
//     noteCard.appendChild(removeButton);

//     // Add the note card to the container
//     notesContainer.appendChild(noteCard);

//     // Clear the textarea
//     noteText.value = '';

//     // Save notes to localStorage
//     saveNotes();
// }

// // Save notes to localStorage
// function saveNotes() {
//     const notes = [];
//     const noteCards = notesContainer.querySelectorAll('.note-card p');
//     noteCards.forEach((card) => notes.push(card.textContent));
//     localStorage.setItem('notes', JSON.stringify(notes));
// }

// // Load notes from localStorage
// function loadNotes() {
//     const notes = JSON.parse(localStorage.getItem('notes') || '[]');
//     notes.forEach((noteContent) => {
//         const noteCard = document.createElement('div');
//         noteCard.className = 'note-card';

//         const noteParagraph = document.createElement('p');
//         noteParagraph.textContent = noteContent;
//         noteCard.appendChild(noteParagraph);

//         const removeButton = document.createElement('button');
//         removeButton.className = 'remove-button';
//         removeButton.textContent = 'Remove';
//         removeButton.addEventListener('click', () => {
//             noteCard.remove();
//             saveNotes();
//         });
//         noteCard.appendChild(removeButton);

//         notesContainer.appendChild(noteCard);
//     });
// }

// // Event listener for the add note button
// addNoteButton.addEventListener('click', addNote);

// // Load notes when the page is loaded
// window.onload = loadNotes;



// Reference to the notes container and input elements
const notesContainer = document.getElementById('note-container');
const noteInput = document.getElementById('input-note');
const addNoteButton = document.getElementById('note-add-button');
const clearAllNotesButton = document.getElementById('clear-all-notes-button');

// Function to update the note stats (optional, for a note count display)
function updateNoteStats() {
    const notes = countNotes();
    const noteCountElement = document.getElementById("note-count");
    if (noteCountElement) {
        noteCountElement.textContent = notes;
    }
}

// Function to count the number of notes displayed
function countNotes() {
    return notesContainer.children.length;
}

// Function to store a note in localStorage
function storeNoteInLocalStorage(note) {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notes.push(note); // Add the new note
    localStorage.setItem('notes', JSON.stringify(notes)); // Save the updated array
}

// Function to remove a note from localStorage
function removeNoteFromLocalStorage(note) {
    let notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notes = notes.filter((storedNote) => storedNote !== note); // Remove the specific note
    localStorage.setItem('notes', JSON.stringify(notes)); // Save the updated array
}

// Function to display a single note
function displayNote(note) {
    const noteCard = document.createElement('div');
    noteCard.className = 'note-card';

    const noteParagraph = document.createElement('p');
    noteParagraph.textContent = note;
    noteCard.appendChild(noteParagraph);

    const removeButton = document.createElement('button');
    removeButton.className = 'remove-button';
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', function () {
        noteCard.remove(); // Remove the note card from the container
        removeNoteFromLocalStorage(note); // Remove the note from localStorage
        updateNoteStats();
    });
    noteCard.appendChild(removeButton);

    notesContainer.appendChild(noteCard);
}

// Function to load all notes from localStorage and display them
function loadNotesFromLocalStorage() {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notes.forEach((note) => displayNote(note));
    updateNoteStats();
}

// Event listener for adding a note
addNoteButton.addEventListener('click', function () {
    const noteContent = noteInput.value.trim();

    // Validate input
    if (noteContent === '') {
        alert('Please write something to add a note.');
        return;
    }

    // Store the note in localStorage
    storeNoteInLocalStorage(noteContent);

    // Display the note
    displayNote(noteContent);

    // Clear the input field
    noteInput.value = '';

    updateNoteStats();
});

// Event listener for clearing all notes
clearAllNotesButton.addEventListener('click', function () {
    notesContainer.innerHTML = ''; // Clear the container
    localStorage.removeItem('notes'); // Clear all notes from localStorage
    updateNoteStats();
});

// Load notes when the page is loaded
window.onload = loadNotesFromLocalStorage;

