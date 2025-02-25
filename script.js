document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    loadDarkMode();
});

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");
    li.innerHTML = `
        <span onclick="toggleComplete(this)">${taskText}</span>
        <button class="delete" onclick="deleteTask(this)">❌</button>
    `;

    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
}

function toggleComplete(task) {
    task.classList.toggle("completed");
    saveTasks();
}

function deleteTask(task) {
    task.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach((li) => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.querySelector("span").classList.contains("completed"),
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        let taskList = document.getElementById("taskList");
        JSON.parse(savedTasks).forEach((task) => {
            let li = document.createElement("li");
            li.innerHTML = `
                <span onclick="toggleComplete(this)" class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <button class="delete" onclick="deleteTask(this)">❌</button>
            `;
            taskList.appendChild(li);
        });
    }
}

/* Dark Mode Toggle */
const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

function loadDarkMode() {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
    }
}
