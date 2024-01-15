const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'calebe',
    password: '*',
    database: 'Teste',
    connectionLimit: 5
});
module.exports = pool;
