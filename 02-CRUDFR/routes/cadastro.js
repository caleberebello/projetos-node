const express = require('express');
const router = express.Router();
const db = require('../database');
var docs;

router.get('/cadastro', (req, res) => {
    res.render('cadastro', {title: 'Cadastro', "cadastro": docs});
    console.log(docs)
});

router.post('/cadastro', async (req, res) => {
    console.log(docs);
})

module.exports = router;