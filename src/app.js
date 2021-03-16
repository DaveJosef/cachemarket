const express = require('express');
const cors = require('cors');


// Roteamento

const app = express();
const index = require('./routes/index');


// Definições da aplicação

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(index);

module.exports = app;