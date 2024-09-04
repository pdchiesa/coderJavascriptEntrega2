/* // Selectores

let toDoInput = document.getElementById("add-nota");
let toDoBtn = document.getElementById("btn-add-nota");
let toDoList = document.querySelector(".todo-list");

// Event Listeners

toDoBtn.addEventListener("click", addToDo);
toDoList.addEventListener("click", deletecheck);
// DOMContentLoaded carga el listado si existian datos en el local storage
document.addEventListener("DOMContentLoaded", getTodos);

function addToDo(event) {
  // evita que la pagina se recargue
  event.preventDefault();
  // crea el DIV contenedor de notas;
  let toDoDiv = document.createElement("div");
  toDoDiv.classList.add("todo", "fondo-todo");

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
    checked.classList.add("check-btn", "fondo-todo");
    toDoDiv.appendChild(checked);
    // delete btn;
    let deleted = document.createElement("button");
    deleted.innerHTML = '<i class="fas fa-trash"></i>';
    deleted.classList.add("delete-btn", "fondo-todo");
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
    // animacion de  caer al eliminar
    item.parentElement.classList.add("caer");

    //borra item del local storage;
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
    toDoDiv.classList.add("todo", "fondo-todo");

    // Create LI
    let newToDo = document.createElement("li");

    newToDo.innerText = todo;
    newToDo.classList.add("todo-item");
    toDoDiv.appendChild(newToDo);

    // check btn;
    let checked = document.createElement("button");
    checked.innerHTML = '<i class="fas fa-check"></i>';
    checked.classList.add("check-btn", "fondo-todo");
    toDoDiv.appendChild(checked);
    // delete btn;
    let deleted = document.createElement("button");
    deleted.innerHTML = '<i class="fas fa-trash"></i>';
    deleted.classList.add("delete-btn", "fondo-todo");
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
 */

// Selectores
/* 
let toDoInput = document.getElementById("add-nota");
let toDoBtn = document.getElementById("btn-add-nota");
let toDoList = document.querySelector(".todo-list");

// Event Listeners

toDoBtn.addEventListener("click", addToDo);
toDoList.addEventListener("click", deletecheck);
document.addEventListener("DOMContentLoaded", getTodos);

async function addToDo(event) {
  event.preventDefault();

  let toDoDiv = document.createElement("div");
  toDoDiv.classList.add("todo", "fondo-todo");

  let newToDo = document.createElement("li");
  if (toDoInput.value === "") {
    swal("Cuidado", "Ingresa alguna tarea!!!", "error");
    
  } else {
    newToDo.innerText = toDoInput.value;
    newToDo.classList.add("todo-item");
    toDoDiv.appendChild(newToDo);

    // Asíncrono: guardando en local storage
    await saveLocal(toDoInput.value);

    let checked = document.createElement("button");
    checked.innerHTML = '<i class="fas fa-check"></i>';
    checked.classList.add("check-btn", "fondo-todo");
    toDoDiv.appendChild(checked);

    let deleted = document.createElement("button");
    deleted.innerHTML = '<i class="fas fa-trash"></i>';
    deleted.classList.add("delete-btn", "fondo-todo");
    toDoDiv.appendChild(deleted);

    toDoList.appendChild(toDoDiv);

    toDoInput.value = "";
  }
}

async function deletecheck(event) {
  let item = event.target;

  if (item.classList[0] === "delete-btn") {
    item.parentElement.classList.add("caer");

    // Asíncrono: borrando del local storage
    await removeLocalTodos(item.parentElement);

    item.parentElement.addEventListener("transitionend", function () {
      item.parentElement.remove();
    });
  }

  if (item.classList[0] === "check-btn") {
    item.parentElement.classList.toggle("completed");
  }
}

async function saveLocal(todo) {
  let todos = await getLocalTodos();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

async function getTodos() {
  let todos = await getLocalTodos();

  todos.forEach(function (todo) {
    let toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo", "fondo-todo");

    let newToDo = document.createElement("li");

    newToDo.innerText = todo;
    newToDo.classList.add("todo-item");
    toDoDiv.appendChild(newToDo);

    let checked = document.createElement("button");
    checked.innerHTML = '<i class="fas fa-check"></i>';
    checked.classList.add("check-btn", "fondo-todo");
    toDoDiv.appendChild(checked);

    let deleted = document.createElement("button");
    deleted.innerHTML = '<i class="fas fa-trash"></i>';
    deleted.classList.add("delete-btn", "fondo-todo");
    toDoDiv.appendChild(deleted);

    toDoList.appendChild(toDoDiv);
  });
}

async function getLocalTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

async function removeLocalTodos(todo) {
  let todos = await getLocalTodos();
  let todoIndex = todos.indexOf(todo.children[0].innerText);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
 */

// Selectores

let toDoInput = document.getElementById("add-nota");
let toDoBtn = document.getElementById("btn-add-nota");
let toDoList = document.querySelector(".todo-list");

// Event Listeners

toDoBtn.addEventListener("click", addToDo);
toDoList.addEventListener("click", deletecheck);
document.addEventListener("DOMContentLoaded", getTodos);

async function addToDo(event) {
  event.preventDefault();

  let toDoDiv = document.createElement("div");
  toDoDiv.classList.add("todo", "fondo-todo");

  let newToDo = document.createElement("li");
  if (toDoInput.value === "") {
    swal("Cuidado", "Ingresa alguna tarea!!!", "error");
  } else {
    newToDo.innerText = toDoInput.value;
    newToDo.classList.add("todo-item");
    toDoDiv.appendChild(newToDo);

    let taskObject = {
      text: toDoInput.value,
      completed: false,
    };

    // Asíncrono: guardando en local storage
    await saveLocal(taskObject);

    let checked = document.createElement("button");
    checked.innerHTML = '<i class="fas fa-check"></i>';
    checked.classList.add("check-btn", "fondo-todo");
    toDoDiv.appendChild(checked);

    let deleted = document.createElement("button");
    deleted.innerHTML = '<i class="fas fa-trash"></i>';
    deleted.classList.add("delete-btn", "fondo-todo");
    toDoDiv.appendChild(deleted);

    toDoList.appendChild(toDoDiv);

    toDoInput.value = "";
  }
}

async function deletecheck(event) {
  let item = event.target;

  if (item.classList[0] === "delete-btn") {
    item.parentElement.classList.add("caer");

    await removeLocalTodos(item.parentElement);

    item.parentElement.addEventListener("transitionend", function () {
      item.parentElement.remove();
    });
  }

  if (item.classList[0] === "check-btn") {
    item.parentElement.classList.toggle("completed");

    let text = item.parentElement.children[0].innerText;
    await toggleCompleted(text);
  }
}

async function saveLocal(task) {
  let todos = await getLocalTodos();
  todos.push(task);
  localStorage.setItem("todos", JSON.stringify(todos));
}

async function getTodos() {
  let todos = await getLocalTodos();

  todos.forEach(function (todo) {
    let toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo", "fondo-todo");
    if (todo.completed) {
      toDoDiv.classList.add("completed");
    }

    let newToDo = document.createElement("li");

    newToDo.innerText = todo.text;
    newToDo.classList.add("todo-item");
    toDoDiv.appendChild(newToDo);

    let checked = document.createElement("button");
    checked.innerHTML = '<i class="fas fa-check"></i>';
    checked.classList.add("check-btn", "fondo-todo");
    toDoDiv.appendChild(checked);

    let deleted = document.createElement("button");
    deleted.innerHTML = '<i class="fas fa-trash"></i>';
    deleted.classList.add("delete-btn", "fondo-todo");
    toDoDiv.appendChild(deleted);

    toDoList.appendChild(toDoDiv);
  });
}

async function getLocalTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

async function removeLocalTodos(todo) {
  let todos = await getLocalTodos();
  let todoIndex = todos.findIndex(
    (task) => task.text === todo.children[0].innerText
  );
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

async function toggleCompleted(taskText) {
  let todos = await getLocalTodos();
  let todoIndex = todos.findIndex((task) => task.text === taskText);
  todos[todoIndex].completed = !todos[todoIndex].completed;
  localStorage.setItem("todos", JSON.stringify(todos));
}
