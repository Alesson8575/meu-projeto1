const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Conexão com o MySQL
const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Rota para salvar o nome
app.post('/api/nome', async (req, res) => {
  const { nome } = req.body;
  if (!nome) return res.status(400).json({ message: 'Nome é obrigatório' });

  try {
    await db.query('INSERT INTO nomes (nome) VALUES (?)', [nome]);
    res.json({ message: 'Nome salvo com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
