let tasks = [];

//FETCH ALL TASKS
async function fetchTasks() {
    const res = await fetch("http://localhost:3000/todos");
    tasks = await res.json();
    renderTasks();
}

//ADD TASK
async function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: taskText }),
    });

    input.value = "";
    fetchTasks();
}

//RENDER TASKS
function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        // toggle complete
        li.addEventListener("click", () => {
            toggleTask(task._id);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            deleteTask(task._id);
        };

        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

//TOGGLE COMPLETE
async function toggleTask(id) {
    await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PUT",
    });
    fetchTasks();
}

//DELETE TASK
async function deleteTask(id) {
    await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
    });
    fetchTasks();
}
const input = document.getElementById("taskInput");

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});
fetchTasks();
