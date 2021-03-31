const jwt = require('jsonwebtoken')
const SECRET = 'Backend_Hjg06'

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, SECRET, { expiresIn: 300 })
}

export default generateToken
