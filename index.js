let tasks = [];

// FETCH ALL TASKS
async function fetchTasks() {
    const res = await fetch("http://localhost:3000/todos");
    tasks = await res.json();
    renderTasks();
}

// ADD TASK (with due date)
async function addTask() {
    const input = document.getElementById("taskInput");
    const dateInput = document.getElementById("dateInput");

    const taskText = input.value.trim();
    const dueDate = dateInput.value;

    if (taskText === "" || dueDate === "") {
        alert("Please enter task and due date");
        return;
    }

    await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text: taskText,
            dueDate: dueDate,
        }),
    });

    input.value = "";
    dateInput.value = "";
    fetchTasks();
}

// RENDER TASKS (text + due date)
function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task) => {
        const li = document.createElement("li");

        let dueDateText = "No due date";
        if (task.dueDate) {
            dueDateText = new Date(task.dueDate).toLocaleDateString();
        }

        li.innerHTML = `
            <span>
                ${task.text}
                <br />
                <small>Due: ${dueDateText}</small>
            </span>
        `;

        if (task.completed) {
            li.classList.add("completed");
        }

        // Toggle complete
        li.addEventListener("click", () => {
            toggleTask(task._id);
        });

        // Delete button
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

// TOGGLE COMPLETE
async function toggleTask(id) {
    await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PUT",
    });
    fetchTasks();
}

// DELETE TASK
async function deleteTask(id) {
    await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
    });
    fetchTasks();
}

// ENTER KEY SUPPORT
const input = document.getElementById("taskInput");
input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// INITIAL LOAD
fetchTasks();
