const jwt = require('jsonwebtoken')
const SECRET = 'Backend_Hjg06'


function decodeToken (token) {
  return new Promise ((resolve, reject) => {
    jwt.verify(token, SECRET, function(err, decodedToken) {
      if (err) reject(err)
      else resolve(decodedToken)
    })
  })
}

export default decodeToken
