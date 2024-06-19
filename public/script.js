async function fetchTasks() {
    const response = await fetch('/tasks');
    const tasks = await response.json();
    return tasks;
}

async function saveTasks(tasks) {
    await fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tasks)
    });
}

async function loadTasks() {
    const tasks = await fetchTasks();
    document.querySelectorAll('#hamza-tasks input').forEach((input, index) => {
        input.checked = tasks.hamza[index] || false;
    });
    document.querySelectorAll('#manahil-tasks input').forEach((input, index) => {
        input.checked = tasks.manahil[index] || false;
    });
}

function updateTasks() {
    const hamzaTasks = Array.from(document.querySelectorAll('#hamza-tasks input')).map(input => input.checked);
    const manahilTasks = Array.from(document.querySelectorAll('#manahil-tasks input')).map(input => input.checked);
    saveTasks({ hamza: hamzaTasks, manahil: manahilTasks });
}

function logout() {
    sessionStorage.removeItem('username');
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
    if (!sessionStorage.getItem('username')) {
        window.location.href = 'login.html';
    } else {
        loadTasks();
    }
});
