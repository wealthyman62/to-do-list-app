// DOM Elements
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

// State
let tasks = [];

// Add Task Function
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(task);
    taskInput.value = ""; // Clear input
    renderTasks();
  }
}

// Delete Task Function
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

// Toggle Task Completion
function toggleTaskCompletion(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

// Filter Tasks
function filterTasks(filter) {
  let filteredTasks = tasks;
  if (filter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  } else if (filter === "incomplete") {
    filteredTasks = tasks.filter(task => !task.completed);
  }
  renderTasks(filteredTasks);
}

// Render Tasks
function renderTasks(filteredTasks = tasks) {
  taskList.innerHTML = ""; // Clear the list
  filteredTasks.forEach(task => {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    if (task.completed) taskItem.classList.add("completed");

    taskItem.innerHTML = `
      <span>${task.text}</span>
      <div>
        <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTaskCompletion(${task.id})">
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    taskList.appendChild(taskItem);
  });
}

// Handle Filter Button Clicks
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    button.classList.add("active");
    const filter = button.dataset.filter;
    filterTasks(filter);
  });
});

// Event Listeners
addTaskButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});
