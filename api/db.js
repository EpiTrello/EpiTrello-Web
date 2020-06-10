const { Pool } = require('pg')
const bcrypt = require('bcrypt')
// salt is the encryption key used to encode / decode
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
var pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function register(username, password) {
  const query = 'SELECT * FROM USERS WHERE USERNAME = $1'
  const values = [username]
  const { rows } = await pool.query(query, values);
  if (rows.length != 0)
    return ({ ok: false, message: "username already exist" })
  const query_insert = 'INSERT INTO USERS(username, password) VALUES($1, $2);'
  const hash = bcrypt.hashSync(password, salt);
  const values_insert = [username, hash];
  await pool.query(query_insert, values_insert);
  return ({ ok: true })
}


async function login(username, password) {
  const query = 'SELECT * FROM USERS WHERE USERNAME = $1';
  const values = [username];
  const { rows } = await pool.query(query, values);
  if (rows.length == 0)
    return ({ ok: false })
  const hash = bcrypt.hashSync(rows[0].password, salt);
  if (!bcrypt.compareSync(rows[0].password, hash))
    return ({ok: false})
  return ({ ok: true, id: rows[0].id })
}

var db = { register, login }
module.exports = db