// Select relevant DOM elements
const noteInput = document.getElementById('input-note');
const addNoteButton = document.getElementById('note-add-button');
const noteContainer = document.getElementById('note-show');
const clearAllNotesButton = document.getElementById('clear-all-notes-button');

// Add a note to the container
function addNote() {
    const noteText = noteInput.value.trim();

    // Validate that the input is not empty
    if (noteText === '') {
        alert('Please write something before adding a note.');
        return;
    }

    // Create a note card
    const noteCard = document.createElement('div');
    noteCard.classList.add('note-card');
    noteCard.innerHTML = `
        <p>${noteText}</p>
        <button class="delete-note-button">Delete</button>
    `;

    // Append the note card to the note container
    noteContainer.appendChild(noteCard);

    // Clear the input field
    noteInput.value = '';

    // Add functionality to the delete button
    const deleteButton = noteCard.querySelector('.delete-note-button');
    deleteButton.addEventListener('click', () => {
        noteContainer.removeChild(noteCard);
    });
}

// Clear all notes from the container
function clearAllNotes() {
    if (confirm('Are you sure you want to clear all notes?')) {
        noteContainer.innerHTML = '';
    }
}

// Attach event listeners
addNoteButton.addEventListener('click', addNote);
clearAllNotesButton.addEventListener('click', clearAllNotes);

// Optional: Add functionality for pressing "Enter" to add a note
noteInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addNote();
    }
});
