const express = require('express');
const fs = require('fs');
const mariadb = require('mariadb');
const bodyParser = require('body-parser');
const app = express();
const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'calebe',
    database: 'Teste',
    password: 'Gbr123456',
    connectionLimit: 5
});
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});

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

app.post("/cadastro", jsonParser, async(req, res) => {
    console.log(req.body);
    /*
    let conn;
    console.log(nome);
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(`INSERT INTO Pessoa VALUES ('${nome}', '${cpf}', '${nasc}', '${email}', '${telefone}', '${end}', '${cidade}', '${estado}')`);
        console.log(rows);
    } catch (err) {
        console.log(err);
    }
    */
})

app.get("/teste", async(req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM Pessoa");
        console.log(rows);
        const jsonS = JSON.stringify(rows);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(jsonS);
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
})

app.listen(PORT, ()=>console.log(`Servidor está escutando na ${PORT}`));