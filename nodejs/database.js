const express = require("express");
const cors = require("cors");
const mariadb = require("mariadb");

const app = express();
app.use(cors());
const pool = mariadb.createPool({
    host: '*',
    user: '*',
    password: '*',
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
        res.end(e);
    }
});

app.post("/teste/criar", async(req, res) => {
    let conn;
    const nome = req.body.nome ;
    const idade = req.body.idade;
    try{
        conn = await pool.getConnection();
        const rows = await conn.query(`INSERT INTO teste.pessoa (nome, idade) VALUES ('` + nome + `',` + idade + `)`);
        const jsonS = JSON.stringify(rows);
        res.send(jsonS);
    } catch (e) {
        res.send(e);
        console.log(e);
    }
})

app.listen(4003, () => console.log("Servidor está rodando na porta 4003"));