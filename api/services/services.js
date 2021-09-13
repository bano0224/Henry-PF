const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

const createToken = (user) => {
    const payload = {
        sub: user_id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    }

    return jwt.encode(payload, `${process.env.JWT_SECRET_KEY}`)
}

module.exports = createToken