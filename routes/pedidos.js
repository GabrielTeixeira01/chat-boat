const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { cliente, produto, quantidade } = req.body;

  const sql = `
    INSERT INTO pedidos (cliente, produto, quantidade, status)
    VALUES (?, ?, ?, 'PENDENTE')
  `;

  db.query(sql, [cliente, produto, quantidade], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      mensagem: "Pedido criado!",
      id: result.insertId
    });
  });
});


router.get('/', (req, res) => {
  db.query("SELECT * FROM pedidos", (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });
});

router.put('/:id', (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  db.query(
    "UPDATE pedidos SET status = ? WHERE id = ?",
    [status, id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ mensagem: "Status atualizado!" });
    }
  );
});

router.post('/webhook', (req, res) => {
  console.log("Webhook recebido:", req.body);

  res.json({ mensagem: "Webhook processado!" });
});

module.exports = router;