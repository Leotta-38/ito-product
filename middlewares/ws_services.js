const User = require('../models/user')
const Topic = require('../models/topic')
const Room = require('../models/room')

const msgTypeList = {
  REQ_JOIN_ROOM: 0,
  RES_JOIN_ROOM: 1,
  RES_JOIN_ROOM_ERRORA: "1a",
  REQ_GET_TOPIC: 2,
  RES_GET_TOPIC: 3,
  REQ_GET_A_CARD: 4,
  RES_GET_A_CARD: 5,
  REQ_SUBMIT_RESPONSE: 6,
  RES_SUBMIT_RESPONSE: 7,
  REQ_SUBMIT_ORDER: 8,
  RES_SUBMIT_ORDER: 9,
  REQ_RESET_ORDER: 10,
  RES_RESET_ORDER: 11,
  REQ_CHECK_ORDER: 12,
  RES_CHECK_ORDER: 13,
  REQ_CONTINUE_GAME: 14,
  RES_CONTINUE_GAME: 15,
  REQ_FINISH_GAME: 16,
  RES_FINISH_GAME: 17,
  REQ_EXIT_ROOM: 18,
  RES_EXIT_ROOM: 19
}

async function joinRoom(clientsList, data, uuid) {
  if(data.type === 0) {
    await User.create(data.username, uuid)
    const users = await User.findAllOrderById()

    for (let clientUuid in clientsList) {
      const resData = {
        type: msgTypeList.RES_JOIN_ROOM,
        users: users,
        isGameMaster: false
      }

      const ws = clientsList[clientUuid]
      if (clientUuid === resData.users[0].uuid) {
        resData.isGameMaster = true
      }
      ws.send(JSON.stringify(resData))
    }
  } else {
    return
  }
}

async function showRandomTopic(clientsList, data) {
  if (data.type === 2) {
    await Room.updateStatusOn()
    const randomTopic = await Topic.findRandom()

    for (let clientUuid in clientsList) {
      const resData = {
        type: msgTypeList.RES_GET_TOPIC,
        topic: randomTopic
      }

      const ws = clientsList[clientUuid]
      ws.send(JSON.stringify(resData))
    }
  } else {
    return
  }
}

async function giveACard(clientsList, data) {
  if (data.type === 4) {
    const numberOgPlayers = Object.keys(clientsList).length
    const randomNumbers = createRandomNumbers(numberOgPlayers)
    let i = 0
    for (let clientUuid in clientsList) {
      await User.changeNumber(randomNumbers[i], clientUuid)
      i++
    }

    const users = await User.findAllOrderById()

    for (let clientUuid in clientsList) {
      const resData = {
        type: msgTypeList.RES_GET_A_CARD,
        users: users
      }

      const ws = clientsList[clientUuid]
      ws.send(JSON.stringify(resData))
    }
  } else {
    return
  }
}

async function submitResponse(clientsList, data, uuid) {
  if(data.type === 6) {
    await User.updateResponse(data.response, uuid)
    const users = await User.findAllOrderById()

    for (let clientUuid in clientsList) {
      const resData = {
        type: msgTypeList.RES_SUBMIT_RESPONSE,
        users: users
      }

      const ws = clientsList[clientUuid]
      ws.send(JSON.stringify(resData))
    }
  } else {
    return
  }
}

async function submitOrder(clientsList, data) {
  if(data.type === 8) {
    await User.updateOrderid(data.count, data.id)
    const users = await User.findAllOrderById()

    for (let clientUuid in clientsList) {
      const resData = {
        type: msgTypeList.RES_SUBMIT_ORDER,
        users: users
      }

      const ws = clientsList[clientUuid]
      ws.send(JSON.stringify(resData))
    }
  } else {
    return
  }
}

async function resetOrder(clientsList, data) {
  if(data.type === 10) {
    await User.destroyOrderid()
    const users = await User.findAllOrderById()

    for (let clientUuid in clientsList) {
      const resData = {
        type: msgTypeList.RES_RESET_ORDER,
        users: users
      }

      const ws = clientsList[clientUuid]
      ws.send(JSON.stringify(resData))
    }
  } else {
    return
  }
}

async function checkOrder(clientsList, data) {
  if(data.type === 12) {

    for (let clientUuid in clientsList) {
      const resData = {
        type: msgTypeList.RES_CHECK_ORDER
      }

      const ws = clientsList[clientUuid]
      ws.send(JSON.stringify(resData))
    }
  } else {
    return
  }
}

async function continueGame(clientsList, data) {
  if(data.type === 14) {
    const numberOgPlayers = Object.keys(clientsList).length
    const randomNumbers = createRandomNumbers(numberOgPlayers)
    let i = 0
    for (let clientUuid in clientsList) {
      await User.changeNumber(randomNumbers[i], clientUuid)
      i++
    }

    await User.destroyResponse()
    await User.destroyOrderid()
    const users = await User.findAllOrderById()
    const randomTopic = await Topic.findRandom()

    for (let clientUuid in clientsList) {
      const resData = {
        type: msgTypeList.RES_CONTINUE_GAME,
        users: users,
        topic: randomTopic
      }

      const ws = clientsList[clientUuid]
      ws.send(JSON.stringify(resData))
    }
  } else {
    return
  }
}

async function finishGame(clientsList, data) {  
  if(data.type === 16) {
    await Room.updateStatusOff()
    await User.recreateRoom()

    for (let clientUuid in clientsList) {
      const resData = {
        type: msgTypeList.RES_FINISH_GAME
      }

      const ws = clientsList[clientUuid]
      ws.send(JSON.stringify(resData))
    }
  } else {
    return
  }
}

async function exitRoom(clientsList, data, uuid) {
  if(data.type === 18) {

    await User.destroyUser(uuid)
    const users = await User.findAllOrderById()

    if(users.length !== 0) {
      for (let clientUuid in clientsList) {
        const resData = {
          type: msgTypeList.RES_EXIT_ROOM,
          users: users,
          isGameMaster: false
        }
  
        const ws = clientsList[clientUuid]
        if (clientUuid === resData.users[0].uuid) {
          resData.isGameMaster = true
        }
        ws.send(JSON.stringify(resData))
      }
    }
  } else {
    return
  }
}

function createRandomNumbers(numberOgPlayers) {
  let randomNumbers = []
  for(let i = 0; i < numberOgPlayers; i++) {
    let randomNumber = Math.floor(Math.random() * 100) + 1
    while (randomNumbers.includes(randomNumber)) {
      randomNumber = Math.floor(Math.random() * 100) + 1
    }
    randomNumbers.push(randomNumber)
  }
  return randomNumbers
}

module.exports = {
  joinRoom,
  showRandomTopic,
  giveACard,
  submitResponse,
  submitOrder,
  resetOrder,
  checkOrder,
  continueGame,
  finishGame,
  exitRoom
}
