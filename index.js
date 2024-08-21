const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const voteRoutes = require('./routes/voteRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/api', voteRoutes);

app.use(express.static('public'));

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate(); 
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    await sequelize.sync(); 
    console.log(`Servidor está rodando na porta ${PORT}`);
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
});
