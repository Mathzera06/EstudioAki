require('dotenv').config({ path: '../../../.env' });
const jwt = require('jsonwebtoken');

function jwtAuthentication(req, res, next) {
    const authorization = req.headers.authorization;
    const token = authorization.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (error, tokenData) => {
        if (error) return res.sendStatus(403);
        req.user = tokenData;
        next();
    })
}

module.exports = {
    jwtAuthentication
}