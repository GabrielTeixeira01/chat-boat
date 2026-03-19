const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const pedidosRoutes = require('./routes/pedidos');
app.use('/pedidos', pedidosRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});