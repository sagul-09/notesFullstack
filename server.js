const express = require('express');
const app = express();
const path = require('path');
const { logger } = require ('./middleware/logger');

const PORT = process.env.PORT || 3000;

app.use(logger);//this is a middleware function that logs the request method, request path, and request headers origin

app.use(express.json());//this is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.

app.use("/", express.static(path.join(__dirname, 'public')));//this is the public folder and the express.static is a buildin middleware function in express to serve static files

app.use('/',require('./routes/root'));//the require function is used to load and cache the root.js file

app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if(req.accepts('json')){
        res.json({message: '404 not found'});
    }else{
        res.type('txt').send('404 not found');
    }});


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost://${PORT}`);
    });