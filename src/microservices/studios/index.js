require('dotenv').config({ path: '../../../.env' });

//Express config
const express = require('express');
const app = express();
app.use(express.json());

// JWT
const jwt = require('jsonwebtoken');

// Models
const Studio = require('../database/Studio');
const StudioSchedule = require('../database/StudioSchedule');
const Instruments = require('../database/Instruments');

app.post('/studios', async (req, res) => {
    // const {  } = req.body;
});

app.listen(5000, () => {
    console.log('Studios is listening in PORT 5000');
});