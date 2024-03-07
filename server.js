require('dotenv').config()

const crypto = require("crypto")
const express = require('express')
const app = express()
const expressWs = require('express-ws')(app)
const port = process.env.PORT
const roomRouter = require('./routes/room_router')
const wsServices = require('./middlewares/ws_services')
const initialiseDb = require('./middlewares/initialise_db')

app.use(express.static('public'))

app.use(roomRouter)

initialiseDb()

const clientsList = {}

app.ws('/', ws => {
  ws.on('error', console.error)

  const uuid = crypto.randomUUID()
  clientsList[uuid] = ws

  ws.on('message', data => {
    const dataInJs = JSON.parse(data)

    console.log(dataInJs)

    wsServices.joinRoom(clientsList, dataInJs, uuid)
    wsServices.showRandomTopic(clientsList, dataInJs)
    wsServices.giveACard(clientsList, dataInJs)
    wsServices.submitResponse(clientsList, dataInJs, uuid)
    wsServices.submitOrder(clientsList, dataInJs)
    wsServices.resetOrder(clientsList, dataInJs)
    wsServices.checkOrder(clientsList, dataInJs)
    wsServices.continueGame(clientsList, dataInJs)
    wsServices.finishGame(clientsList, dataInJs)
    wsServices.exitRoom(clientsList, dataInJs, uuid)
    wsServices.demoMode(clientsList, dataInJs)
  })

  ws.on('close', () => {
    delete clientsList[uuid]
    const numberOgPlayers = Object.keys(clientsList).length
    if (numberOgPlayers === 0) {
      initialiseDb()
    }
  })
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
