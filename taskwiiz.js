// Reference to the content container
const contentContainer = document.getElementById('content-container');

// Event listener for adding a task
document.getElementById('task-add-button').addEventListener('click', function () {
    const inputDate = document.getElementById('input-date');
    const inputTask = document.getElementById('input-task');
    const date = inputDate.value;
    const task = inputTask.value;
    
    // Check if the task is empty
    if (task === "") {
        alert('Please add a task');
    } else {
        // Store the task in localStorage
        localStorageTask(date, task);
        // Display the new task in the table
        displayAll(date, task);
    }
});

// Event listener for clearing all tasks
document.getElementById('clear-all-button').addEventListener('click', function () {
    contentContainer.innerHTML = ''; // Clear the content in the table
    localStorage.clear(); // Clear all tasks from localStorage
});

// Function to store the task in localStorage
const localStorageTask = (date, task) => {
    const key = `${date}`;
    localStorage.setItem(key, task);
};

// Function to display a task in the table
const displayAll = (date, task) => {
    const tr = document.createElement('tr');
    contentContainer.appendChild(tr);

    const th1 = document.createElement('td');
    tr.appendChild(th1);
    th1.innerText = date;
    document.getElementById('input-date').value = "";

    const th2 = document.createElement('td');
    tr.appendChild(th2);
    th2.innerText = task;
    document.getElementById('input-task').value = "";

    const th3 = document.createElement('td');
    tr.appendChild(th3);
    const removeButton = document.createElement('button');
    removeButton.className = "remove-button";
    removeButton.innerText = "Remove";
    removeButton.addEventListener('click', function () {
        tr.remove(); // Remove the task from the table
        localStorage.removeItem(date); // Remove the task from localStorage
    });
    th3.appendChild(removeButton);
};

// Load tasks from localStorage when the page is loaded
window.onload = () => {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const task = localStorage.getItem(key);
        displayAll(key, task);
    }
};
function goToHome() {
    window.location.href = "home.html"; // Replace with the correct path if necessary
}
function goToTask() {
        window.location.href = "task.html"; // Replace with the correct path if necessary
    }
