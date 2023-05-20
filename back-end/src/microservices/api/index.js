const axios = require('axios')
const express = require('express')
const app = express();
app.use(express.json());

const { jwtAuthentication } = require('../authentication/middleware');

app.get('/', async (req, res) => {
    res.send("Página Inicial - StudioAki")
}); 

app.post('/event', (req, res) => {
    const {evento} = req.body
    console.log(evento)
    return res.send(200)
})

app.get('/my-account', jwtAuthentication, (req, res) => {
    res.json(200); 
}); 

app.listen(4000, () => {
    console.log('API is running, in Port 4000');
});