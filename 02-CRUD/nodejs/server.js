const http = require("http");

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type':'application/json' });

    if(req.url === '/produto') {
        res.end(JSON.stringify({
            message: "Rota de produto",
        }));
    }

    if(req.url === '/usuario') {
        res.end(JSON.stringify({
            message: "Rota de usuário",
        }));
    }

    res.end(JSON.stringify({
        message: "Qualquer outra rota",
    }));
}).listen(4001, () => console.log("Servidor está rondando na porta 4001"));