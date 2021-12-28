const express = require('express');
const path = require('path');
const { readResumeContents } = require('./gsheet')
const app = express();
const port = process.env.PORT || 4000;
app.use(express.static('public'))

app.route('/', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/read_resume', async function(req, res) {
    await readResumeContents(req, res);
});

app.listen(port);
console.log('Server started at http://localhost:' + port);