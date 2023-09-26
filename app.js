const express = require("express");
const { randomUUID } = require("crypto");
const fs = require("fs");
const mariadb = require("mariadb");

const app = express();
const pool = mariadb.createPool({
    host: 'ip',
    user: 'usuário',
    password: 'senha',
    connectionLimit: 5,
});

app.use(express.json());

let products = [];

fs.readFile("products.json", "utf-8", (err, data) => {
    if(err) {
        console.log(err);
    } else {
        products = JSON.parse(data);
    }
})

/**
 * Params => parâmetros de rota => /products/129838123
 * Query => parâmetros de rota (chave=valor) => /products?id=2183719827312
 */

app.post("/products", (req, res) => {
    const { name, price } = req.body;

    product = {
        name,
        price,
        id: randomUUID(),
    }

    products.push(product)

    productFile();

    return res.json(product)
});

app.get("/products", (req, res) => {
    return res.json(products);
});

app.get("/products/:id", (req, res) => {
    const { id } = req.params;
    const product = products.find(product => product.id === id);
    return res.json(product);
});

app.put("/products/:id", (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;

    const productIndex = products.findIndex(product => product.id === id);
    products[productIndex] = {
        ...products[productIndex],
        name,
        price
    };

    productFile();

    return res.json({message: "Produto alterado com sucesso!"})
});

app.delete("/products/:id", (req, res) => {
    const { id } = req.params;
    const productIndex = products.findIndex(product => product.id === id);
    products.splice(productIndex, 1);
    productFile();

    return res.json({message: "Produto removido com sucesso!"})
});

app.post("/teste", async(req, res) =>{
    let conn;
    try{
        conn = await pool.getConnection();
        const rows = await conn.query(`SELECT nome FROM teste.pessoa WHERE id='1'`);
        console.log(rows);
        const jsonS = JSON.stringify(rows);
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(jsonS);
    }
    catch(e){

    }
});

function productFile() {
    fs.writeFile("products.json", JSON.stringify(products), (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log("Produto inserido");
        }
    })
};

app.listen(4002, () => console.log("Servidor está rodando na porta 4002"));