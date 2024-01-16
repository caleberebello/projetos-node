const express = require('express');
const cadastroRouter = require('./routes/cadastro');
const usersRouter = require('./routes/users');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/cadastro', cadastroRouter);
app.use('/users', usersRouter);
PORT = 3000;

app.listen(PORT, ()=>console.log(`Servidor está escutando na ${PORT}`));