const express = require('express')
const router = express.Router()
const Checkers = require('../middlewares/checkers')

const endpoint = process.env.ENDPOINT

router.get('/api/room/:username', async (req, res) => {
  const username = req.params.username

  const isIfUsernameIsDuplicated = await Checkers.checkIfUsernameIsDuplicated(username)
  const isGoing = await Checkers.checkIfIsGoing()
  const isFull = await Checkers.checkIfIsFull()

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


module.exports = router