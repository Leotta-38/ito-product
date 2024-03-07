const db = require('../db')

async function findAllOrderById() {
  const sql = `SELECT * FROM players ORDER BY id;`
  const result = await db.query(sql)
  return result.rows
}

async function create(username, uuid) {
  const sql = `
    INSERT INTO players (username, uuid) 
    VALUES ($1, $2) 
    RETURNING *;
  `
  const result = await db.query(sql, [username, uuid])
  return result.rows[0]
}

async function updateResponse(response, uuid) {
  const sql = `
    UPDATE players
    SET 
      response = $1 
    WHERE uuid = $2 
    RETURNING *;
  `

  const result = await db.query(sql, [response, uuid])
  return result.rows[0]
}

async function updateOrderid(orderid, id) {
  const sql = `
    UPDATE players
    SET 
      orderid = $1 
    WHERE id = $2 
    RETURNING *;
  `

  const result = await db.query(sql, [orderid, id])
  return result.rows[0]
}

async function destroyOrderid() {
  const sql = `
    UPDATE players
    SET 
      orderid = NULL 
    RETURNING *;
  `

  const result = await db.query(sql)
  return result.rows
}

async function changeNumber(number, uuid) {
  const sql = `
    UPDATE players
    SET 
      number = $1
    WHERE uuid = $2 
    RETURNING *;
  `

  const result = await db.query(sql, [number, uuid])
  return result.rows
}

async function destroyResponse() {
  const sql = `
    UPDATE players
    SET 
      response = NULL 
    RETURNING *;
  `

  const result = await db.query(sql)
  return result.rows
}

async function destroyUser(uuid) {
  const sql = `
    DELETE FROM players 
    WHERE uuid = $1 
    RETURNING *;
  `
  const result = await db.query(sql, [uuid])
  return result.rows[0]
}

async function recreateRoom() {
  const sql1 = `
    DROP TABLE players;
  `
  await db.query(sql1)

  const sql2 = `
    CREATE TABLE players(
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      uuid TEXT NOT NULL,
      number INTEGER UNIQUE,
      response TEXT,
      orderid INTEGER UNIQUE
    );
  `
  await db.query(sql2)
}


module.exports = {
  findAllOrderById,
  create,
  updateResponse,
  updateOrderid,
  destroyOrderid,
  changeNumber,
  destroyResponse,
  destroyUser,
  recreateRoom
}