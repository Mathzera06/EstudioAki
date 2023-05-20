const axios = require('axios')
require('dotenv').config({ path: '../../../.env' });

// Express Config
const express = require('express');
const app = express();
app.use(express.json());

// Models
const User = require('../database/User');
const RefreshToken = require('../database/RefreshToken');

// JWT
const jwt = require('jsonwebtoken');

var cors = require('cors')
app.use(cors());

app.post('/signup', async (req, res) => {
    // Add Input validation here

    if (await User.findOne({ where: { email: req.body.email } })) {
        return res.json({
            error: true,
            message: 'Já existe um usuário com este e-mail cadastrado!'
        }).status(400);
    }

    await User.create(req.body)
        .then(() => {
            // axios.post('http://localhost:7000/event', {log: "New user"})
            return res.json({
                error: false,
                message: "Usuário Cadastrado com sucesso"
            })
        }).catch(() => {
            return res.status(400).json({
                error: true,
                message: "Erro: Usuário não cadastrado"
            });
        });
});

app.post('/event', (req, res) => {
    const {evento} = req.body
    console.log(evento)
    return res.send(200);
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.send('E-mail ou Senha em brancos!', 400);

    let user = await User.findOne({
        where: {
            email,
            password
        }
    });

    if (user) {
        const { password, ...rest } = JSON.parse(JSON.stringify(user));
        user = rest;

        const accessToken = generateAccessToken(user);

        return res.json({ accessToken });
    }

    return res.send('Usuário não encontrado', 400);
});

app.delete('/logout', async (req, res) => {
    await RefreshToken.destroy({
        where: {
            key: req.body.refreshToken
        }
    });

    res.sendStatus(204);
});


function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET_KEY);
}


app.listen(3000, () => {
    console.log("Authentication is running. Port 3000")
});

