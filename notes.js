// Reference to the notes container
const notesContainer = document.getElementById('notes-container');
const noteText = document.getElementById('note-text');
const addNoteButton = document.getElementById('add-note-button');

// Function to add a note
function addNote() {
    const noteContent = noteText.value.trim();

    // Check if the note is empty
    if (noteContent === '') {
        alert('Please write something to add a note.');
        return;
    }

    // Create a note card
    const noteCard = document.createElement('div');
    noteCard.className = 'note-card';

    // Add note content
    const noteParagraph = document.createElement('p');
    noteParagraph.textContent = noteContent;
    noteCard.appendChild(noteParagraph);

    // Add remove button
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-button';
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
        noteCard.remove();
        saveNotes();
    });
    noteCard.appendChild(removeButton);

    // Add the note card to the container
    notesContainer.appendChild(noteCard);

    // Clear the textarea
    noteText.value = '';

    // Save notes to localStorage
    saveNotes();
}

// Save notes to localStorage
function saveNotes() {
    const notes = [];
    const noteCards = notesContainer.querySelectorAll('.note-card p');
    noteCards.forEach((card) => notes.push(card.textContent));
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Load notes from localStorage
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notes.forEach((noteContent) => {
        const noteCard = document.createElement('div');
        noteCard.className = 'note-card';

        const noteParagraph = document.createElement('p');
        noteParagraph.textContent = noteContent;
        noteCard.appendChild(noteParagraph);

        const removeButton = document.createElement('button');
        removeButton.className = 'remove-button';
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            noteCard.remove();
            saveNotes();
        });
        noteCard.appendChild(removeButton);

        notesContainer.appendChild(noteCard);
    });
}

// Event listener for the add note button
addNoteButton.addEventListener('click', addNote);

// Load notes when the page is loaded
window.onload = loadNotes;
