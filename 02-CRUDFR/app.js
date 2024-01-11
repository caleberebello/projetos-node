const express = require('express');
const fs = require('fs');
app = express();
app.use(express.static(__dirname + '/src'));
PORT = 3000;

app.get("/", (req, res) => {
    fs.readFile(__dirname + '/src/index.html', (err, data) => {
        if (err) {
            res.writeHead(500, {'content-type': 'application/json; charset=utf-8'});
            res.end("Erro: não existe o arquivo index.html");
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    })
});

app.listen(PORT, ()=>console.log(`Servidor está escutando na ${PORT}`));