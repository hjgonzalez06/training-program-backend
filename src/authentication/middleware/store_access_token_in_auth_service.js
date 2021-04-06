import setAccessToken from '~/src/service_providers/authentication/set_access_token'
import getRequestHeader from '~/src/service_providers/http/get_request_header'

export default (req, res, next) => {
  const authorizationHeaderValue = getRequestHeader('Authorization')

  try{
    const token = authorizationHeaderValue.replace('Bearer ','')
    setAccessToken(token)
  } catch (e) {
    console.log('Access token is undefined')
  }

  next()
}
