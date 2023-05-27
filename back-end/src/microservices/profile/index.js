const express = require('express');
const app = express();
app.use(express.json());

// Models
const User = require('../database/User');
const { jwtAuthentication } = require('../authentication/middleware');

var cors = require('cors')
app.use(cors());

app.get('/users/:id', jwtAuthentication, async (req, res) => {
  const userId = parseInt(req.params.id);

  if (userId !== req.user.id) {
    return res.status(403).json({ error: 'Acesso não autorizado' });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Ocorreu um erro ao buscar os dados do usuário' });
  }
});

app.put('/users/:id', jwtAuthentication, async (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;

  if (userId !== req.user.id) {
    return res.status(403).json({ error: 'Acesso não autorizado' });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Atualiza os dados do usuário
    user.name = name;
    user.email = email;
    await user.save();

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Ocorreu um erro ao atualizar os dados do usuário' });
  }
});

app.listen(7000, () => {
  console.log('Servidor rodando na porta 7000');
});
