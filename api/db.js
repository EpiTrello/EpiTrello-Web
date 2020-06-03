const { Pool } = require('pg')
var pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function register(username, password) {
  const query = 'SELECT * FROM USERS WHERE USERNAME = $1'
  const values = [username]
  const { rows } = await pool.query(query, values);
  if (rows.length != 0)
    return ({ ok: false, message: "username already exist" })
  const query_insert = 'INSERT INTO USERS(username, password) VALUES($1, $2);'
  const values_insert = [username, password];
  await pool.query(query_insert, values_insert);
  return ({ ok: true })
}


async function login(username, password) {
  const query = 'SELECT * FROM USERS WHERE USERNAME = $1 AND PASSWORD = $2';
  const values = [username, password];
  const { rows } = await pool.query(query, values);
  if (rows.length == 0)
    return ({ ok: false })
  return ({ ok: true, id: rows[0].id })
}

var db = { register, login }
module.exports = db