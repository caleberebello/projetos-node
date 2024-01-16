const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/usuarios', async (req,res) => {
    let conn;
    const sql = 'SELECT * FROM Pessoa';
    try {
        conn = await db.getConnection();
        const rows = await conn.query(sql);
        res.render('usuarios', {title: 'User List', userData: rows});
    } catch (err) {
        throw err;
    }
    /*
    var conn;
    const sql = 'SELECT * FROM Pessoa';
    conn = await db.getConnection();
    console.log(db);
    conn.query(sql, (err,data) => {
        if (err) throw err;
        res.render('usuarios', {title: 'User List', userData: data});
    });
    */
});

module.exports = router;