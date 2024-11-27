const setState = (key: string, data: any): void => {
    if (typeof data === "string") {
        localStorage.setItem(key, data);
    } else {
        localStorage.setItem(key, JSON.stringify(data));
    }
};

const getState = (key: string): any => {
    let isValid = localStorage.getItem(key);
    if (isValid) {
        try {
            const result = JSON.parse(isValid);
            return result;
        } catch (err) {
            return isValid;
        }
    }
};

let elForm: HTMLFormElement | null = document.querySelector(".todo-form");
let elInput: HTMLInputElement | null = document.querySelector(".todo-input");
let elList: HTMLUListElement | null = document.querySelector(".todo-list");

interface TodoType {
    value: string;
}

let todos: Array<TodoType> = getState("todos") || [];
let editingIndex: number | null = null;

elForm?.addEventListener("submit", function (e: Event) {
    e.preventDefault();
    const data: TodoType = {
        value: (elInput as HTMLInputElement).value
    };

    if (editingIndex !== null) {
        todos[editingIndex] = data;
        editingIndex = null;
    } else {
        todos.push(data);
    }

    renderTodos(todos, elList);
    (elInput as HTMLInputElement).value = "";
    setState("todos", todos);
});

function renderTodos(arr: TodoType[], list: HTMLUListElement | null): void {
    (list as HTMLUListElement).innerHTML = '';
    arr.forEach((item: TodoType, index: number) => {
        let elItem: HTMLLIElement = document.createElement("li");
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
        list?.appendChild(elItem);
    });
}

function handleDelete(id: number): void {
    todos.splice(id, 1);
    renderTodos(todos, elList);
    setState("todos", todos);
}

function handleUpdate(id: number): void {
    const todoToEdit = todos[id];
    (elInput as HTMLInputElement).value = todoToEdit.value;
    editingIndex = id;
}

renderTodos(todos, elList);