const db = require('../db')

async function findAll() {
  const sql = `SELECT * FROM rooms;`
  const result = await db.query(sql)
  return result.rows[0]
}

async function updateStatusOn() {
  const sql = `
    UPDATE rooms
    SET 
      is_going = true
    RETURNING *;
  `

  const result = await db.query(sql)
  return result.rows[0]
}

async function updateStatusOff() {
  const sql = `
    UPDATE rooms
    SET 
      is_going = false
    RETURNING *;
  `

  const result = await db.query(sql)
  return result.rows[0]
}

module.exports = {
  findAll,
  updateStatusOn,
  updateStatusOff
}