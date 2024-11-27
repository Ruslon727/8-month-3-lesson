"use strict";
const setState = (key, data) => {
    if (typeof data === "string") {
        localStorage.setItem(key, data);
    }
    else {
        localStorage.setItem(key, JSON.stringify(data));
    }
};
const getState = (key) => {
    let isValid = localStorage.getItem(key);
    if (isValid) {
        try {
            const result = JSON.parse(isValid);
            return result;
        }
        catch (err) {
            return isValid;
        }
    }
};
let elForm = document.querySelector(".todo-form");
let elInput = document.querySelector(".todo-input");
let elList = document.querySelector(".todo-list");
let todos = getState("todos") || [];
let editingIndex = null;
elForm === null || elForm === void 0 ? void 0 : elForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = {
        value: elInput.value
    };
    if (editingIndex !== null) {
        todos[editingIndex] = data;
        editingIndex = null;
    }
    else {
        todos.push(data);
    }
    renderTodos(todos, elList);
    elInput.value = "";
    setState("todos", todos);
});
function renderTodos(arr, list) {
    list.innerHTML = '';
    arr.forEach((item, index) => {
        let elItem = document.createElement("li");
        elItem.className = "flex items-center justify-between p-2 bg-slate-300 rounded-md";
        elItem.innerHTML = `
            <div>
                <span class="text-[20px] ">${index + 1}.</span>
                <strong class="text-[22px]">${item.value}</strong>
            </div>
            <div class="space-x-2">
                <button onclick="handleUpdate(${index})" class="text-center bg-blue-500 text-white font-semibold p-[9.5px] rounded-md"
                    type="button">Update</button>
                <button onclick="handleDelete(${index})" class="text-center bg-red-500 text-white font-semibold p-[9.5px] rounded-md"
                    type="button">Delete</button>
            </div>`;
        list === null || list === void 0 ? void 0 : list.appendChild(elItem);
    });
}
function handleDelete(id) {
    todos.splice(id, 1);
    renderTodos(todos, elList);
    setState("todos", todos);
}
function handleUpdate(id) {
    const todoToEdit = todos[id];
    elInput.value = todoToEdit.value;
    editingIndex = id;
}
renderTodos(todos, elList);
