const express = require("express");
const cors = require("cors");
const mariadb = require("mariadb");

const app = express();
app.use(cors());
const pool = mariadb.createPool({
    host: '192.168.0.121',
    user: 'dbteste2',
    password: 'Gbr123456',
});

app.use(express.json());

app.get("/teste/retornar", async(req, res) => {
    let conn;
    try{
        conn = await pool.getConnection();
        const rows = await conn.query(`SELECT * FROM teste.pessoa`);
        const jsonS = JSON.stringify(rows);
        res.send(jsonS);
    }
    catch(e){
        console.log(e);
    }
});

app.get("/teste/:id", async(req, res) =>{
    let conn;
    const { id } = req.params;
    try{
        conn = await pool.getConnection();
        const rows = await conn.query(`SELECT * FROM teste.pessoa WHERE id='` + id + `'`);
        const jsonS = JSON.stringify(rows);
        res.end(jsonS);
    }
    catch(e){
        console.log(e);
    }
});

app.post("/teste/criar", async(req, res) => {
    let conn;
    const nome = req.body.nome;
    const idade = req.body.idade;
    const id = req.body.id;
    try{
        conn = await pool.getConnection();
        const rows = await conn.query(`INSERT INTO teste.pessoa (nome, idade, id) VALUES ('` + nome + `',` + idade + `,` + id + `)`);
        const jsonS = JSON.stringify(rows);
        res.send(jsonS);
    } catch (e) {
        
    }
})

app.listen(4003, () => console.log("Servidor está rodando na porta 4003"));