const express = require('express');
let api = require('./api');

let app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

api(app);

app.listen(8888);

console.log('Remote Server is running on port 8888');
