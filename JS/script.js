// Selectors

let toDoInput = document.getElementById("add-nota");
let toDoBtn = document.getElementById("btn-add-nota");
let toDoList = document.querySelector(".todo-list");

// Event Listeners

toDoBtn.addEventListener("click", addToDo);
toDoList.addEventListener("click", deletecheck);
document.addEventListener("DOMContentLoaded", getTodos);

// Functions;
function addToDo() {
  // crea el DIV;
  let toDoDiv = document.createElement("div");
  toDoDiv.classList.add("todo", "darker-todo");

  // Crea el LI
  let newToDo = document.createElement("li");
  if (toDoInput.value === "") {
    alert("Ingresa alguna tarea");
  } else {
    newToDo.innerText = toDoInput.value;
    newToDo.classList.add("todo-item");
    toDoDiv.appendChild(newToDo);

    // agrega al local storage;
    savelocal(toDoInput.value);

    // check btn;
    let checked = document.createElement("button");
    checked.innerHTML = '<i class="fas fa-check"></i>';
    checked.classList.add("check-btn", "darker-todo");
    toDoDiv.appendChild(checked);
    // delete btn;
    let deleted = document.createElement("button");
    deleted.innerHTML = '<i class="fas fa-trash"></i>';
    deleted.classList.add("delete-btn", "darker-todo");
    toDoDiv.appendChild(deleted);

    // agrega tarea a la lista;
    toDoList.appendChild(toDoDiv);

    // limpia el input;
    toDoInput.value = "";
  }
}

function deletecheck(event) {
  let item = event.target;

  // delete
  if (item.classList[0] === "delete-btn") {
    // item.parentElement.remove();
    // animation
    item.parentElement.classList.add("caer");

    //removing local todos;
    removeLocalTodos(item.parentElement);

    item.parentElement.addEventListener("transitionend", function () {
      item.parentElement.remove();
    });
  }

  // check
  if (item.classList[0] === "check-btn") {
    item.parentElement.classList.toggle("completed");
  }
}

// Saving to local storage:
function savelocal(todo) {
  //Check: if item/s are there;
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  //Check: if item/s are there;
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    // toDo DIV;
    let toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo", "darker-todo");

    // Create LI
    let newToDo = document.createElement("li");

    newToDo.innerText = todo;
    newToDo.classList.add("todo-item");
    toDoDiv.appendChild(newToDo);

    // check btn;
    let checked = document.createElement("button");
    checked.innerHTML = '<i class="fas fa-check"></i>';
    checked.classList.add("check-btn", "darker-todo");
    toDoDiv.appendChild(checked);
    // delete btn;
    let deleted = document.createElement("button");
    deleted.innerHTML = '<i class="fas fa-trash"></i>';
    deleted.classList.add("delete-btn", "darker-todo");
    toDoDiv.appendChild(deleted);

    // Append to list;
    toDoList.appendChild(toDoDiv);
  });
}

function removeLocalTodos(todo) {
  //Check: if item/s are there;
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  let todoIndex = todos.indexOf(todo.children[0].innerText);
  // console.log(todoIndex);
  todos.splice(todoIndex, 1);
  // console.log(todos);
  localStorage.setItem("todos", JSON.stringify(todos));
}
