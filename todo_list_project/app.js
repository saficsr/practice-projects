const addInput = document.querySelector("#addBox")
const filterInput = document.querySelector("#filterInput")
const removeButton = document.querySelector("#clearAllTodo")
const form = document.querySelector(".todoAddForm")
const newTodos = document.querySelector(".newTodos")
function runEvents() {
    form.addEventListener("submit", addTodo)
    removeButton.addEventListener("click", removeAll)
    filterInput.addEventListener("keyup",filter)
    document.addEventListener("DOMContentLoaded", pageLoaded)
}
runEvents()
function addTodo(e) {
    e.preventDefault()
    const inputText = addInput.value.toLowerCase().trim()
    if (inputText == null || inputText == "") {
    }
    else {
        addTodoToUI(inputText)
        addToStorage(inputText)
        addInput.value = ""
    }
}
function addToStorage(newTodo) {
    let todos = checkTodoFromStorage()
    todos.push(newTodo)
    localStorage.setItem("todos", JSON.stringify(todos))
}
function checkTodoFromStorage() {
    let todos
    if (localStorage.getItem("todos") === null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    return todos
}
function addTodoToUI(text) {
    const li = document.createElement("li")
    li.className = "todo-item"
    const span = document.createElement("span")
    span.textContent = text
    const deleteBtn = document.createElement("button")
    deleteBtn.className = "delete-btn"
    deleteBtn.textContent = "x"
    deleteBtn.addEventListener("click", () => {
        li.remove()
        let todos = checkTodoFromStorage()
        todos = todos.filter(t => t !== text)
        localStorage.setItem("todos", JSON.stringify(todos))
    })
    li.appendChild(span)
    li.appendChild(deleteBtn)
    document.querySelector(".newTodos").appendChild(li)
}
function removeAll() {
    const todoList = document.querySelectorAll(".todo-item")
    if (todoList.length > 0) {
        todoList.forEach(function (todo) {
            todo.remove()
        })
        todos = []
        localStorage.setItem("todos", JSON.stringify(todos))

    }


}
function filter(e) {
    const filterValue = e.target.value.toLowerCase().trim()
    const todoFromItemList = document.querySelectorAll(".todo-item")
    if (todoFromItemList.length > 0) {
        todoFromItemList.forEach(function (todo) {
            if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
                todo.setAttribute("style", "display : flex")
            }
            else {
                todo.setAttribute("style", "display : none !important")
            }
        })
    }

}
function pageLoaded(){
    let todos = checkTodoFromStorage()
    todos.forEach(function(todo){
        addTodoToUI(todo)
    })
}
