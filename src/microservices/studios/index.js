require('dotenv').config({ path: '../../../.env' });

//Express config
const express = require('express');
const app = express();
app.use(express.json());

// JWT
const jwt = require('jsonwebtoken');
const { jwtAuthentication } = require('../authentication/middleware');

// Models
const Studio = require('../database/Studio');
const StudioSchedule = require('../database/StudioSchedule');
const Instruments = require('../database/Instruments');
const User = require('../database/User');

app.post('/studios', jwtAuthentication, async (req, res) => {
    const {
        name,
        address,
        complement,
        neighbourhood,
        number,
        zip_code,
        user_id
    } = req.body;

    // Simple Validation
    const requiredFields = { name, address, neighbourhood, zip_code, user_id };
    const blankFields = Object.keys(requiredFields).filter(key => !requiredFields[key]);
    if (blankFields.length) {
        return res.json({
            errors: blankFields.map(field => `Valor em branco para o campo ${field}`),
        }, 400);
    }

    const user = await User.findByPk(user_id);
    if (!user) return res.send('Usuário não encontrado', 400);

    const studio = await Studio.findOne({
        where: { 
            name,
            user_id
        }
    });
    if (studio) return res.json('Não é permitido o cadastro de estúdios com o mesmo nome', 400);

    const studioData = { ...requiredFields, complement, number };
    await Studio.create(studioData).then(() => {
        return res.json('Estudio adicionado com sucesso', 201);
    }).catch(error => {
        console.log(error);
        return res.json('Não foi possível adicionar o estúdio', 400);
    });
});

app.listen(5000, () => {
    console.log('Studios is listening on PORT 5000');
});