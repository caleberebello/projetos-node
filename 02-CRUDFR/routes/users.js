const express = require('express');
const router = express.Router();
const db = require('../database');
let conn = db.getConnection();

router.get('/usuarios', async (req,res) => {
    const sql = 'SELECT * FROM Pessoa';
    conn = await db.getConnection();
    await conn.query(sql, async (err,data) => {
        if (err) throw err;
        await res.render('usuarios', {title: 'User List', userData: data});
    });
});

module.exports = router;