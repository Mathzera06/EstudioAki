const express = require('express')
const app = express()
app.use(express.json())
const axios = require('axios')

app.post('/event', async (req, res) => {
    const evento = req.body
    console.log('event received', evento);

    try {
        //Microserviço de autenticação
        await axios.post('http://localhost:3000/event', evento)
    } catch (error) {
        console.error(error)
    }
    try {
        //Microserviço da API
        await axios.post('http://localhost:4000/event', evento)
    } catch (error) {
        console.error(error)
    }
    try {
        //Microserviço de Studios
        await axios.post('http://localhost:5000/event', evento)
    } catch (error) {
        console.log(error)
    }
    try {
        //Microserviço de logs
        await axios.post('http://localhost:6000/event', evento)
    } catch (error) {
        console.error(error)
    }
    return res.send(200)
})

app.listen(7000, () => { console.log("Event bus is running. Port 7000") })