
const Router = require('express')
const router = new Router()
const MiddleWareAuth = require('./MiddleWare/MiddleWareAuth')
const User = require('./Models/Users')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('./Config/MiddleWareAuth')
const bcrypt = require('bcrypt')

const generateAccessToken = (id, name, email, username) => {
  const payload = { id, name, email, username }

  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: '24h'
  })
}

router.post('/registration', async (req, res) => {
  try {
    const { name, email, username, password } = req.body
    const hashPassword = bcrypt.hashSync(password, 6)
    const user = new User({ name, email, username, password: hashPassword })

    await user.save()
    return res.json({ message: 'Аккаунт создан...' })

  } catch (e) {
    console.log(e)
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, username, password } = req.body
    const user = await User.findOne({ email })
    const token = generateAccessToken(user._id, user.email, user.username)

    return res.json({ message: 'текстст', token })

  } catch (e) {
    console.log(e)
  }
})

module.exports = router