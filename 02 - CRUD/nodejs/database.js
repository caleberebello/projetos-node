const express = require("express");
const cors = require("cors");
const mariadb = require("mariadb");

const app = express();
app.use(cors());
const pool = mariadb.createPool({
    host: '*',
    user: '*',
    password: '*'
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

app.put("/teste/alterar/:id", async(req, res) => {
    let conn;
    const { id } = req.params;
    const nome = req.body.altera.kill;
    const idade = req.body.altera.age;
    try{
        conn = await pool.getConnection();
        const rows = await conn.query(`UPDATE teste.pessoa SET nome = '${nome}', idade = ${idade} WHERE id='${id}'`)
        const jsonS = JSON.stringify(rows);
        res.send(jsonS);
        console.log(jsonS);
    } catch (e) {
        res.send(e);
        console.log(e);
    }
})

app.post("/teste/criar", async(req, res) => {
    let conn;
    const nome = req.body.banco.kill;
    const idade = req.body.banco.age;
    try{
        conn = await pool.getConnection();
        const rows = await conn.query(`INSERT INTO teste.pessoa (nome, idade) VALUES ('${nome}', ${idade})`);
        const jsonS = JSON.stringify(rows);
        res.send(jsonS);
    } catch (e) {
        res.send(e);
    }
})

app.delete("/teste/deletar/:id", async(req,res) => {
    let conn;
    const { id } = req.params;
    try{
        conn = await pool.getConnection();
        const rows = await conn.query(`DELETE FROM teste.pessoa WHERE id = '${id}'`);
        const jsonS = JSON.stringify(rows);
        res.send(jsonS);
    }catch(e){
        res.send(e);
    }
})

app.listen(4003, () => console.log("Servidor está rodando na porta 4003"));
