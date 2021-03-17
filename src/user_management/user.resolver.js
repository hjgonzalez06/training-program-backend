import { AuthenticationError } from 'apollo-server-express'

import models from '~/src/service_providers/sequelize/models'

export default {
  Query: {
    users: (_,args) => {
      return models.user.findAll()
    },
    currentUser: (_,args) => {
      return models.user.findOne()
    },
    logInUser: async (_,{email, password}) => {
      const user = await models.user.findOne({
        where: {
          email
        }
      }) 
      if (await user?.validatePassword(password)){
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
