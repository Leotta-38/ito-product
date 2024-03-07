const db = require('../db')

async function findRandom() {
  const sql = `
    SELECT * FROM topics 
    ORDER BY RANDOM()
    LIMIT 1;
  `
  const result = await db.query(sql)
  return result.rows[0]
}

async function find12() {
  const sql = `
    SELECT * FROM topics 
    WHERE id = 12;
  `
  const result = await db.query(sql)
  return result.rows[0]
}


module.exports = {
  findRandom,
  find12
}