const taskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
const todoList = document.getElementById("incompleteTasks");
const completedList = document.getElementById("completed-tasks");

const createDeleteButton = function () {
  const deleteButton = document.createElement("button");
  const icon = document.createElement("img");
  deleteButton.className = "delete";
  icon.src = "./remove.svg";
  deleteButton.appendChild(icon);
  return deleteButton;
};

const createTaskItem = function (taskText) {
  const taskItem = document.createElement("li");

  const checkbox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = createDeleteButton();

  // Keep user text out of HTML markup.
  label.innerText = taskText;
  label.className = "task";

  checkbox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit";
  editButton.className = "edit";

  taskItem.append(checkbox, label, editInput, editButton, deleteButton);
  return taskItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const taskItem = createTaskItem(taskInput.value);

  todoList.appendChild(taskItem);
  bindTaskEvents(taskItem);

  taskInput.value = "";
};

const editTask = function () {
  const taskItem = this.parentNode;

  const editInput = taskItem.querySelector("input[type=text]");
  const label = taskItem.querySelector("label");
  const editButton = taskItem.querySelector(".edit");
  const isEditing = taskItem.classList.contains("editMode");
  if (isEditing) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  taskItem.classList.toggle("editMode");
};

const deleteTask = function () {
  const taskItem = this.parentNode;
  const taskList = taskItem.parentNode;
  taskList.removeChild(taskItem);
};

const toggleTaskCompletion = function () {
  const destination = this.checked ? completedList : todoList;
  destination.appendChild(this.parentNode);
};

addButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskItem) {
  const checkbox = taskItem.querySelector("input[type=checkbox]");
  const editButton = taskItem.querySelector("button.edit");
  const deleteButton = taskItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = toggleTaskCompletion;
};

for (let i = 0; i < todoList.children.length; i++) {
  bindTaskEvents(todoList.children[i]);
}

for (let i = 0; i < completedList.children.length; i++) {
  bindTaskEvents(completedList.children[i]);
}
