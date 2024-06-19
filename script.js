const users = {
    hamza: 'password1',
    manahil: 'password2'
};

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) == 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

function saveTasks() {
    const hamzaTasks = Array.from(document.querySelectorAll('#hamza-tasks input')).map(input => input.checked);
    const manahilTasks = Array.from(document.querySelectorAll('#manahil-tasks input')).map(input => input.checked);
    setCookie('hamzaTasks', JSON.stringify(hamzaTasks), 7);
    setCookie('manahilTasks', JSON.stringify(manahilTasks), 7);
}

function loadTasks() {
    const hamzaTasks = JSON.parse(getCookie('hamzaTasks') || '[]');
    const manahilTasks = JSON.parse(getCookie('manahilTasks') || '[]');

    document.querySelectorAll('#hamza-tasks input').forEach((input, index) => {
        input.checked = hamzaTasks[index] || false;
    });
    document.querySelectorAll('#manahil-tasks input').forEach((input, index) => {
        input.checked = manahilTasks[index] || false;
    });
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (users[username] && users[username] === password) {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('main-container').style.display = 'flex';
        loadTasks();
    } else {
        errorMessage.textContent = 'Invalid username or password';
    }
}

function updateTasks() {
    saveTasks();
}
