const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../Config/MiddleWareAuth')

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  token === null ? res.json({ message: 'че то там', status: 403 }) : null

  jwt.verify(token, SECRET_KEY, (err, user) => {
    err ? res.json({ message: 'че то там', status: 403 }) : null

    req.user = user
    next()
  })

}