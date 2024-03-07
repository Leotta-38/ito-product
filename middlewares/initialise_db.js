const User = require('../models/player')
const Room = require('../models/room')

async function initialiseDb() {
  await User.recreateRoom()
  await Room.updateStatusOff()
}

module.exports = initialiseDb