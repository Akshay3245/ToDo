let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ADD TASK
function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false,
    });

    input.value = "";

    saveTasks();
    renderTasks();
}

// RENDER TASKS
function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.text;

        // completed style
        if (task.completed) {
            li.classList.add("completed");
        }

        // click to toggle complete
        li.addEventListener("click", () => {
            toggleTask(index);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

        deleteBtn.onclick = (e) => {
            e.stopPropagation(); // stop toggle when deleting
            deleteTask(index);
        };

        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

// TOGGLE COMPLETE
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// DELETE
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// SAVE
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ENTER KEY SUPPORT
const input = document.getElementById("taskInput");

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// INITIAL LOAD
renderTasks();
