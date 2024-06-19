const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const dataFile = 'tasks.json';

function readTasks() {
    if (fs.existsSync(dataFile)) {
        return JSON.parse(fs.readFileSync(dataFile));
    } else {
        return { hamza: [false, false, false, false, false], manahil: [false, false, false, false, false] };
    }
}

function writeTasks(tasks) {
    fs.writeFileSync(dataFile, JSON.stringify(tasks));
}

app.get('/tasks', (req, res) => {
    res.json(readTasks());
});

app.post('/tasks', (req, res) => {
    const tasks = req.body;
    writeTasks(tasks);
    res.json({ message: 'Tasks updated successfully' });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
