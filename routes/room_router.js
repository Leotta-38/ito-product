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
      message: 'This player name is already used.'
    })
  } else if (isGoing) {
    res.status(503).json({
      message: 'Sorry, the game has already started. Please wait for the next one.'
    })
  } else if (isFull) {
    res.status(503).json({
      message: 'Sorry, the room is full.'
    })
  } else {
    res.status(200).json({
      message: 'ok',
      endpoint: endpoint
    })
  }
})


module.exports = router