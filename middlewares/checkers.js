const User = require('../models/player')
const Room = require('../models/room')

async function checkIfUsernameIsDuplicated(username) {
  const users = await User.findAllOrderById()
  const usernameList = users.map(user => user.username)
  return usernameList.includes(username)
}

async function checkIfIsGoing() {
  const isGoing = await Room.findAll()
  return isGoing.is_going
}

async function checkIfIsFull() {
  const users = await User.findAllOrderById()
  return users.length === 6
}

module.exports = {
  checkIfUsernameIsDuplicated,
  checkIfIsGoing,
  checkIfIsFull
}