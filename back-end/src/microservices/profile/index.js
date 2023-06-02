const express = require('express');
const app = express();
app.use(express.json());

// Models
const User = require('../database/User');
const Studio = require('../database/Studio');
const { Op } = require('sequelize');

// JWT
const { jwtAuthentication } = require('../authentication/middleware');

var cors = require('cors');
app.use(cors());

app.get('/my-account', jwtAuthentication, async (req, res) => {
  const userId = req.user.id;

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

app.put('/my-account', jwtAuthentication, async (req, res) => {
  const userId = req.user.id;
  const {last_name, first_name, email } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Atualiza os dados do usuário
    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;
    await user.save();

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Ocorreu um erro ao atualizar os dados do usuário' });
  }
});

app.get('/users/:id/studios', jwtAuthentication, async (req, res) => {
  const { q } = req.query; // Access the 'q' query parameter
  const studios = await Studio.findAll({
      where: {
          name: {
              [Op.like]: q ? `%${q}%` : '%%'
          },
          user_id: req.user.id
      }
  });
  return res.send(studios, 200);
})

app.listen(9000, () => {
  console.log('Servidor rodando na porta 9000');
});
