require('dotenv').config({ path: '../../../.env' });

//Express config
const express = require('express');
const app = express();
app.use(express.json());

// JWT
const jwt = require('jsonwebtoken');
const { jwtAuthentication } = require('../authentication/middleware');

var cors = require('cors')
app.use(cors());

// Models
const Studio = require('../database/Studio');
const StudioSchedule = require('../database/StudioSchedule');
const Instruments = require('../database/Instruments');
const User = require('../database/User');
const { Op } = require('sequelize');

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
        //axios.post('http://localhost:7000/event')
        return res.json('Estudio adicionado com sucesso', 201);
    }).catch(error => {
        console.log(error);
        return res.json('Não foi possível adicionar o estúdio', 400);
    });
});

app.post('/event', (req, res) => {
    const {evento} = req.body
    console.log(evento)
    return res.send(200)
})

app.get('/studios', jwtAuthentication, async (req, res) => {
    const studios = await Studio.findAll({
        where: {
            name: {
                [Op.like]: `%${req.body.q}%`
            }
        }
    });
    console.log(studios);
    return res.send(studios, 200);
})

app.post('/studios/:id/instruments', jwtAuthentication, async (req, res) => {
    const studio_id = req.params.id;
    const { name, description } = req.body;

    const studio = await Studio.findByPk(studio_id);
    if (!studio) return res.json('Estúdio inválido', 400);

    await Instruments.create({ 
        name,
        description,
        studio_id
     }).then(() => {
        return res.json('Instrumento adicionado com sucesso', 201);
    }).catch(error => {
        console.log(error);
        return res.json('Não foi possível adicionar o instrumento', 400);
    });
})

app.get('/studios/:id/instruments', async(req, res) => {
    const studio_id = req.params.id;
    
    const studio = await Studio.findByPk(studio_id);
    if (!studio) return res.json('Estúdio não encontrado', 400);

    const instruments = await Instruments.findAll({
        where: { studio_id: studio_id }
    })
    return res.json(instruments)
});

app.get('/studios/:id', async(req, res) => {
    const studio_id = req.params.id;

    const studio = await Studio.findByPk(studio_id);
    if (!studio){
        return res.status(404).json({error: "Estúdio não encontrado"});
    }
    return res.json(studio, 200)
})

app.listen(5000, () => {
    console.log('Studios is listening on PORT 5000');
});