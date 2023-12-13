const express = require('express');
const client = require('./connection');
const app = express();


const todoRoute = require('./routes/todo');


app.use(express.json());


app.use(todoRoute)

app.listen(3500);

client.connect()