const express = require("express");
const fs = require("fs");
app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
var usuarios = [];
var PORT = 3000;
app.use(express.static(__dirname + '/src'))

server.listen(PORT, () => console.log(`Servidor está escutando em ${PORT}`));

app.get("/", (req, res) => {
    fs.readFile(__dirname + '/src/index.html', (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end("Erro ao carregar arquivo index.html")
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});

io.on("connection", function(socket){
    socket.on("entrar", function(apelido, callback){
        if(!(apelido in usuarios)){
            socket.apelido = apelido;
            usuarios[apelido] = socket;

            io.sockets.emit("atualizar usuarios", Object.keys(usuarios));
            io.sockets.emit("atualizar mensagens", {msg: "[ " + pegarDataAtual() + " ]: " + apelido + " acabou de entrar na sala", tipo: 'sistema'})

            callback(true);
        } else {
            callback(false);
        }
    });

    /*
    socket.on("enviar mensagem", function(mensagem_enviada, callback){
        mensagem_enviada = "[ " + pegarDataAtual() + " ]: " + socket.apelido + " diz: " + mensagem_enviada;

        io.sockets.emit("atualizar mensagens", mensagem_enviada);
        callback();
    });
    */
    socket.on("enviar mensagem", function(dados, callback){
        var mensagem_enviada = dados.msg;
        var usuario = dados.usu;
        if(usuario == null)
            usuario = '';

        mensagem_enviada = "[ " + pegarDataAtual() + " ] " + socket.apelido + " diz: " + mensagem_enviada;

        if(usuario == '') {
            io.sockets.emit("atualizar mensagens", {msg: mensagem_enviada, tipo: ''});
        }else{
            socket.emit("atualizar mensagens", {msg: mensagem_enviada, tipo: 'privada'});
            usuarios[usuario].emit("atualizar mensagens", {msg: mensagem_enviada, tipo: 'privada'});
        }

        callback();
    })

    socket.on("disconnect", function(){
        delete usuarios[socket.apelido];
        io.sockets.emit("atualizar usuarios", Object.keys(usuarios));
        io.sockets.emit("atualizar mensagens", {msg: "[ " + pegarDataAtual() + " ]: " + socket.apelido + " saiu da sala", tipo: 'sistema'});
    });
});

function pegarDataAtual(){
    var dataAtual = new Date();
    var dia = (dataAtual.getDate()<10 ? '0' : '') + dataAtual.getDate();
    var mes = ((dataAtual.getMonth() + 1)<10 ? '0' : '') + (dataAtual.getMonth() + 1);
    var ano = dataAtual.getFullYear();
    var hora = (dataAtual.getHours()<10 ? '0' : '') + dataAtual.getHours();
    var minuto = (dataAtual.getMinutes()<10 ? '0' : '') + dataAtual.getMinutes();
    var segundo = (dataAtual.getSeconds()<10 ? '0' : '') + dataAtual.getSeconds();

    var dataFormatada = dia + "/" + mes + "/" + ano + " " + hora + ":" + minuto + ":" + segundo;
    return dataFormatada;
};