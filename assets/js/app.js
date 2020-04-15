//Variables section
const taskList = document.getElementById('task-list')

//Event Listeners section
eventListeners();

function eventListeners() {
    document.querySelector('#form').addEventListener('submit', newTask);

    //Cancel task from list
    taskList.addEventListener('click', cancelTask);


    //Remove task from list
    taskList.addEventListener('click', removeTask);

    //Document
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);

}

//Functions section

function newTask(e) {
    e.preventDefault();

    //Reading the text area

    const task = document.getElementById('task').value;

    //The remove button
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-task';
    removeBtn.textContent = 'X';

    //Add text to the list

    const li = document.createElement('li');
    //li = document.createElement('a');
    //br = document.createElement('br');
    li.textContent = task;

    //Add the remove button
    li.appendChild(removeBtn);

    //Add items to the list
    taskList.appendChild(li);
    //taskList.appendChild(br);

    addTaskLocalStorage(task);

    // Print the alert
    alert('Task Added');

    this.reset();
}
//Cancel task
function cancelTask(taskList) {
    taskList.target.style.textDecoration = "line-through";

}

//Remove the task from DOm
function removeTask(e) {
    if (e.target.classList.contains('remove-task')) {
        e.target.parentElement.remove();
    }

    // Remove from Storage
    removeTaskLocalStorage(e.target.parentElement.textContent);
}

function addTaskLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();

    //add the task into the aray
    tasks.push(task);

    //convert task array to a string
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    let tasks;
    const tasksLS = localStorage.getItem('tasks');
    if (tasksLS === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(tasksLS);
    }
    return tasks;
}

//Prints Local Storage Tasks on Load
function localStorageOnLoad() {
    let tasks = getTasksFromLocalStorage();

    //Loop through storage and then print the values

    tasks.forEach(function (task) {
        //Array.prototype.forEach.call(tasks, function (task) {
        //The remove button
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-task';
        removeBtn.textContent = 'X';

        //Add text to the list

        const li = document.createElement('li');
        //li = document.createElement('a');
        //br = document.createElement('br');
        li.textContent = task;

        //Add the remove button
        li.appendChild(removeBtn);

        //Add items to the list
        taskList.appendChild(li);
        // taskList.appendChild(br);
    });
}

function removeTaskLocalStorage(task) {

    //Get tasks from Storage
    let tasks = getTasksFromLocalStorage();

    // Remove the X from task
    const taskDelete = task.substring(0, task.length - 1);

    //Loop through the tasks and remove the task that's equal

    tasks.forEach(function (taskLS, index) {
        //Array.prototype.forEach.call(tasks, function(taskLS, index) {
        if (taskDelete === taskLS) {
            tasks.splice(index, 1);
        }
    });

    //Save data - without the removed list
    localStorage.setItem('tasks', JSON.stringify(tasks));


}