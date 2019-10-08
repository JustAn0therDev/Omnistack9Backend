const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

//Conexão com o Mongo DB pelo link e usando Mongo DB Compass para verificar os dados no banco.
mongoose.connect(
    'mongodb+srv://omnistack:omnistack@omnistack-3ablg.mongodb.net/semana09?retryWrites=true&w=majority',
    {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//req.query = Acessar query params para dados que sao enviados pela url
//req.params = Acessar route params, parametros que sao enviados por rotas
//req.body = Acessar corpo da requisicao (para criacao ou edicao)

//Faz com que o express consiga parsear informacoes enviadas no corpo da requisicao em JSON, tanto para receber quanto para enviar 
app.use(express.json());

//Permite chamadas vindas de outros lugares, IPs, navegadores, etc.
app.use(cors());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

//O server.js agora usa as rotas que foram definidas no arquivo de routes.js
app.use(routes);

app.listen(3333);