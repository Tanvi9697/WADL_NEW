let tasks = [];

window.onload = loadTasks;

function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  tasks = savedTasks ? JSON.parse(savedTasks) : [];
  showTasks();
}

function showTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = tasks.map((t, i) => `
    <li id="task-${i}">
      <span>${t}</span>
      <button onclick="startEditTask(${i})">Edit</button>
      <button onclick="deleteTask(${i})">Delete</button>
    </li>
  `).join('');
}

function addTask() {
  const input = document.getElementById("taskInput");
  if (!input.value.trim()) return;
  tasks.push(input.value.trim());
  input.value = "";
  saveTasks();
}

function startEditTask(i) {
  const li = document.getElementById(`task-${i}`);
  const originalText = tasks[i];

  li.innerHTML = `
    <input type="text" id="editInput-${i}" value="${originalText}">
    <button onclick="confirmEditTask(${i})">Save</button>
    <button onclick="cancelEditTask(${i})">Cancel</button>
  `;
}

function confirmEditTask(i) {
  const newValue = document.getElementById(`editInput-${i}`).value.trim();
  if (newValue) {
    tasks[i] = newValue;
    saveTasks();
  } else {
    cancelEditTask(i);
  }
}

function cancelEditTask(i) {
  showTasks(); // reloads the list from `tasks` array
}

function deleteTask(i) {
  tasks.splice(i, 1);
  saveTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  showTasks();
}
