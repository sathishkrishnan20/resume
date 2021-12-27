const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000;
app.use(express.static('public'))

app.route('/', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);