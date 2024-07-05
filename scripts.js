// scripts.js

document.addEventListener("DOMContentLoaded", () => {
    const newTaskInput = document.getElementById("new-task");
    const addTaskButton = document.getElementById("add-task-button");
    const todoList = document.getElementById("todo-list");
    const taskPriority = document.getElementById("task-priority");

    addTaskButton.addEventListener("click", addTask);
    newTaskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });

    // Load tasks from local storage
    loadTasks();

    function addTask() {
        const taskText = newTaskInput.value.trim();
        const priority = taskPriority.value;
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        const listItem = document.createElement("li");
        listItem.classList.add(priority);
        listItem.innerHTML = `
            <span>${taskText}</span>
            <div class="todo-actions">
                <button class="complete-task">&#10004;</button>
                <button class="delete-task">&#10006;</button>
            </div>
        `;

        listItem.querySelector(".complete-task").addEventListener("click", () => {
            listItem.classList.toggle("completed");
            saveTasks();
        });

        listItem.querySelector(".delete-task").addEventListener("click", () => {
            listItem.style.transform = "translateX(-100%)";
            listItem.style.opacity = "0";
            setTimeout(() => {
                todoList.removeChild(listItem);
                saveTasks();
            }, 300);
        });

        todoList.appendChild(listItem);
        newTaskInput.value = "";
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        todoList.querySelectorAll("li").forEach(item => {
            tasks.push({
                text: item.querySelector("span").textContent,
                completed: item.classList.contains("completed"),
                priority: item.classList.contains("high") ? "high" :
                          item.classList.contains("medium") ? "medium" : "low"
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            const listItem = document.createElement("li");
            listItem.className = task.completed ? `completed ${task.priority}` : task.priority;
            listItem.innerHTML = `
                <span>${task.text}</span>
                <div class="todo-actions">
                    <button class="complete-task">&#10004;</button>
                    <button class="delete-task">&#10006;</button>
                </div>
            `;

            listItem.querySelector(".complete-task").addEventListener("click", () => {
                listItem.classList.toggle("completed");
                saveTasks();
            });

            listItem.querySelector(".delete-task").addEventListener("click", () => {
                listItem.style.transform = "translateX(-100%)";
                listItem.style.opacity = "0";
                setTimeout(() => {
                    todoList.removeChild(listItem);
                    saveTasks();
                }, 300);
            });

            todoList.appendChild(listItem);
        });
    }
});
