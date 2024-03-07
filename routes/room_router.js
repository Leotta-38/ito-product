const express = require('express')
const router = express.Router()
const User = require('../models/player')
const Room = require('../models/room')

const endpoint = process.env.ENDPOINT

router.get('/api/room/:username', async (req, res) => {
  const username = req.params.username

  console.log(username);

  const isIfUsernameIsDuplicated = await checkIfUsernameIsDuplicated(username)
  console.log(isIfUsernameIsDuplicated);

  const isGoing = await checkIfIsGoing()
  console.log(isGoing);

  const isFull = await checkIfIsFull()
  console.log(isFull);

  if (isIfUsernameIsDuplicated) {
    res.status(409).json({
      message: 'this username is already used.'
    })
  } else if (isGoing) {
    res.status(503).json({
      message: 'sorry, the game is going. wait a while.'
    })
  } else if (isFull) {
    res.status(503).json({
      message: 'sorry, the room is full. wait a while.'
    })
  } else {
    res.status(200).json({
      message: 'ok',
      endpoint: endpoint
    })
  }
})

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

module.exports = router