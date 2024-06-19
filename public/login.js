const users = {
    hamza: 'pass',
    manahil: 'pass'
};

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (users[username] && users[username] === password) {
        sessionStorage.setItem('username', username);
        window.location.href = 'index.html';
    } else {
        errorMessage.textContent = 'Invalid username or password';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('username')) {
        window.location.href = 'index.html';
    }
});
