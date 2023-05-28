require('dotenv').config({ path: '../../../.env' });

//Express config
const express = require('express');
const app = express();
app.use(express.json());

// JWT
const { jwtAuthentication } = require('../authentication/middleware');

// Cors
var cors = require('cors')
app.use(cors());

// Models
const Studio = require('../database/Studio');
const StudioSchedule = require('../database/StudioSchedule');

app.post('/studios/:studio_id/schedules', jwtAuthentication, async (req, res) => {
    const studio_id = req.params.studio_id;
    const user_id = req.user.id;

    const studio = await Studio.findByPk(studio_id);
    if (!studio) return res.json('Estúdio inválido', 400);
    if (studio.user_id !== user_id) return res.json('Não autorizado', 400);

    let dates = req.body.dates;
    if (!dates?.length) return res.json('É necessário selecionar pelo menos uma data');
    if (!req.body.minRentHours) return res.json('É necessário informar o mínimo de horas de locação');
    if ((req.body.availableFrom !== 0 && !req.body.availableFrom)) return res.json('É necessário informar o horário inicial de disponibilidade');
    if (!req.body.availableTo) return res.json('É necessário informar o horário final de disponibilidade');

    dates = dates.map(date => {
        let startingFrom = parseInt(req.body.availableFrom);
        let availableTo = parseInt(req.body.availableTo);
        let schedules = [];
        const minRentHours = parseInt(req.body.minRentHours);

        while (true) {
            schedules.push({
                date: new Date(date),
                hour_from: startingFrom,
                hour_to: startingFrom + minRentHours,
                studio_id: parseInt(studio_id)
            })
            startingFrom += minRentHours;
            if ((startingFrom + minRentHours) > availableTo) break;
        }
        return schedules;
    });

    for (let i = 0; i < dates.length; i++) {
        for (let j = 0; j < dates[i].length; j++) {
            try {
                const existingSchedule = await StudioSchedule.findOne({
                    where: dates[i][j]
                });
                if (!existingSchedule) await StudioSchedule.create(dates[i][j])
            } catch (error) {
                console.log(error);
                return res.status(400).json('Erro ao criar agenda para o estúdio');
            }
        }
    }

    return res.json('Agendas criadas com sucesso!', 200);
})

app.get('/studios/:studio_id/schedules', async (req, res) => {
    const studio_id = req.params.studio_id;

    const studio = await Studio.findByPk(studio_id);
    if (!studio) return res.json('Estúdio inválido', 400);

    const schedules = await StudioSchedule.findAll({
        where: {
            studio_id
        }
    });
    return res.send(schedules, 200);
});

app.listen(8000, () => {
    console.log("Studio Schedules is running. Port 8000");
});