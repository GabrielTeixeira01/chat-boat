const express = require('express');

const app = express();
app.use(express.json());

const pedidosRoutes = require('./routes/pedidos');
app.use('/pedidos', pedidosRoutes);

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
