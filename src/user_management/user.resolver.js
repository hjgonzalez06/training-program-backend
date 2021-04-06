import { AuthenticationError } from 'apollo-server-express'

import models from '~/src/service_providers/sequelize/models'
import generateToken from '~/src/service_providers/authentication/generate_token'
import setAccessToken from '~/src/service_providers/authentication/set_access_token'
import getDecodedAccessToken from '~/src/service_providers/authentication/get_decoded_access_token'

export default {
  Query: {
    users: (_,args) => {
      return models.user.findAll()
    },
    currentUser: async (_,args) => {
      console.log(await getDecodedAccessToken())
      return models.user.findOne()
    },
    logInUser: async (_,{email, password}) => {
      const user = await models.user.findOne({
        where: {
          email
        }
      }) 
      if (await user?.validatePassword(password)){
        setAccessToken(generateToken(user.id))
        return user
      }
      throw new AuthenticationError('Invalid credentials')
    }
  },
  Mutation: {
    createUser: async (_,{input}) => {
      const user = await models.user.create({
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password: input.password
      })
      if (user) {
        setAccessToken(generateToken(user.id))
        return {
          code: 'OK',
          success: true,
          message: 'User created successfully',
          user
        }
      }
    }
  }
}
