import bcrypt from 'bcrypt'

export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  const hashPassword = async user => {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
  }

  User.addHook('beforeCreate', async (user, options) => {
    await hashPassword(user)
  })

  User.addHook('beforeUpdate', async (user, options) => {
    await hashPassword(user)
  })

  User.prototype.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password)
  }

  return User
}
