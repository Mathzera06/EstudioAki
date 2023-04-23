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
        const refreshToken = await generateRefreshToken(user);

        return res.json({ accessToken, refreshToken });
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

app.post('/generate_token', async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, (error, tokenData) => {
        if (error) return res.sendStatus(403);
        req.user = tokenData;
    });

    const hasRefreshToken = await RefreshToken.findOne({
        where: {
            key: refreshToken,
            userId: req.user.id
        }
    });
    if (!hasRefreshToken) return res.sendStatus(403);

    return res.json({
        accessToken: generateAccessToken(req.user)
    });

});

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '10m' });
}

async function generateRefreshToken(user) {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET_KEY);

    await RefreshToken.create({
        key: refreshToken,
        userId: user.id
    });

    return refreshToken;
}

app.listen(3000, () => {
    console.log("Authentication is running. Port 3000")
});

