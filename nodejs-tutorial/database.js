const express = require("express");
const mariadb = require("mariadb");

const app = express();
const pool = mariadb.createPool({
    host: '192.168.0.121',
    user: 'dbteste2',
    password: 'Gbr123456',
    connectionLimit: 5,
});

app.use(express.json());

app.get("/teste/:id", async(req, res) =>{
    let conn;
    const { id } = req.params;
    try{
        conn = await pool.getConnection();
        const rows = await conn.query(`SELECT * FROM teste.pessoa WHERE id='` + id + `'`);
        const jsonS = JSON.stringify(rows);
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(jsonS);
    }
    catch(e){
        console.log(e);
    }
});

app.post("/teste", async(req, res) => {
    let conn;
    const { nome, idade, id } = req.body;
    try{
        conn = await pool.getConnection();
        const rows = await conn.query(`INSERT INTO teste.pessoa (nome, idade, id) VALUES ('` + nome + `',` + idade + `,` + id + `)`);
        const jsonS = JSON.stringify(rows);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(jsonS);
    } catch (e) {
        
    }
})

app.listen(4003, () => console.log("Servidor está rodando na porta 4003"));