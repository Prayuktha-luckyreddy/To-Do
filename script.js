// Select elements
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

let tasks = [];

// LocalStorage
document.addEventListener("DOMContentLoaded", () => {
  const stored = localStorage.getItem("tasks");
  tasks = stored ? JSON.parse(stored) : [];
  renderTasks();
});

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render all tasks to the <ul>
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item";
    if (task.completed) li.classList.add("completed");

    const textSpan = document.createElement("span");
    textSpan.textContent = task.text;

    // Toggle completed on click
    textSpan.addEventListener("click", () => {
      toggleTask(index);
    });

    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.textContent = "✕";

    delBtn.addEventListener("click", () => {
      deleteTask(index);
    });

    li.appendChild(textSpan);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

// Add new task
function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  tasks.push({
    text: text,
    completed: false,
  });

  saveTasks();
  renderTasks();

  taskInput.value = "";
  taskInput.focus();
}

// Toggle completed state
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Button click
addBtn.addEventListener("click", addTask);

// Press Enter in input
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});
