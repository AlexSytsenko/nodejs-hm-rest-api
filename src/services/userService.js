const { User } = require('../../model/db/userModel')
// const { NotAthorizedError } = require('../helpers/errors')
const bcrypt = require('bcrypt')

const registration = async (email, password, subscription) => {
  const user = new User({
    email,
    password: await bcrypt.hash(password, 10),
    subscription,
  })

  const newUser = await user.save()

  return newUser
}

const login = async id => {}

const logout = async body => { }

const findUserByEmail = async (email) => {
  const data = await User.findOne({ email })
  return data
}

// async findById(id) {
//   const data = await this.repositories.users.findById(id)
//   return data
// }

module.exports = {
  registration,
  login,
  logout,
  findUserByEmail,
}
