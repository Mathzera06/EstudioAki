const express = require('express')
const app = express()
app.use(express.json())
const winston = require('winston')
const { format, createLogger, transports } = require('winston')
const { timestamp, combine, printf } = format;

const logFormat = format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`
})

// const logger = winston.createLogger({
//     format: format.combine(
//         format.colorize(),
//         timestamp({format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
//     transports: [new transports.Console()],
// })

const logger = winston.createLogger({
    level: 'info',
    format: format.combine(
        format.colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat), defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'express.log', leve: 'info' })
    ]
})

//logger.add(new winston.transports.Http(options)) 


app.post('/event', (req, res) => {
    const evento = req.body
    console.log('loggin', evento);

    logger.log({
        level: 'info',
        message: evento.log
    })

    return res.send(200)
})

app.listen(6000, () => {
    console.log("Logs rodando na porta 6000")
})