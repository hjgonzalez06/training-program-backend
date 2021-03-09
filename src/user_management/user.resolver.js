import { AuthenticationError } from 'apollo-server-express'

import models from '~/src/service_providers/sequelize/models'

export default {
  Query: {
    users: (_,args) => {
      return models.user.findAll()
    },
    currentUser: {

    },
    logInUser: async (_,{email, password}) => {
      const user = await models.user.findOne({
        where: {
          email
        }
      }) 
      if (user && await user.validatePass(password)){
        return user
      }
      throw new AuthenticationError('Invalid credentials')
    }
  },
  Mutation: {
    createUser: async (_,{input}) => {
      const response = await models.user.create({
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password: input.password
      })
      return response
    }
  }
}
