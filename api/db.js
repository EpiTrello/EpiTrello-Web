const { Pool } = require('pg')
const bcrypt = require('bcrypt')
// salt is the encryption key used to encode / decode
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
var pool = new Pool({ connectionString: process.env.DATABASE_URL });


function execQuery(query, values) {
  return pool.query(query, values)
}

async function register(username, password) {
  const query = 'SELECT * FROM USER_ WHERE USERNAME = $1'
  const values = [username]
  const { rows } = await execQuery(query, values);
  if (rows.length != 0)
    return ({ ok: false, message: "username already exist" })
  const query_insert = 'INSERT INTO USER_(username, password) VALUES($1, $2);'
  const hash = bcrypt.hashSync(password, salt);
  const values_insert = [username, hash];
  await execQuery(query_insert, values_insert);
  return ({ ok: true })
}


async function login(username, password) {
  const query = 'SELECT * FROM USER_ WHERE USERNAME = $1';
  const values = [username];
  const { rows } = await execQuery(query, values);
  if (rows.length == 0)
    return ({ ok: false })
  const hash = bcrypt.hashSync(rows[0].password, salt);
  if (!bcrypt.compareSync(rows[0].password, hash))
    return ({ ok: false })
  return ({ ok: true, id: rows[0].id })
}

async function createTab(user_id, title) {
  const { rows } = await execQuery(
    'INSERT INTO TABLE_(TITLE) VALUES($1) RETURNING *;',
    [title]
  )
  await execQuery(
    'INSERT INTO USER_TABLE(USER_ID, TABLE_ID) VALUES($1, $2);',
    [user_id, rows[0].id]
  )
  return { id: rows[0].id }
}

async function getTabs(user_id) {
  const { rows } = await execQuery(
    'SELECT TABLE_.* FROM USER_TABLE LEFT JOIN TABLE_ ON USER_TABLE.TABLE_ID = TABLE_.ID WHERE USER_TABLE.USER_ID = $1',
    [user_id]
  );
  return rows;
}

async function deleteTab(user_id, tab_id) {
  const { rows } = await execQuery(
    'DELETE FROM TABLE_ WHERE ID = $1',
    [tab_id]
  );
  return rows;
}

async function getTab(user_id, tab_id) {
  // check if the user has the specified tab
  const { rows } = await execQuery(
    'SELECT COLUMN_.* FROM TABLE_COLUMN LEFT JOIN COLUMN_ ON TABLE_COLUMN.COLUMN_ID = COLUMN_.ID WHERE TABLE_COLUMN.ID = $1',
    [tab_id]
  );
  // for each column get all card
  return rows;
}

var db = { register, login, getTabs, createTab, deleteTab, getTab }
module.exports = db