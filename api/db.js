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
    'INSERT INTO USER_TABLE(USER_ID, TABLE_ID, OWNER) VALUES($1, $2, TRUE);',
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
  // Check tab owner
  const { rows } = await execQuery(
    'SELECT TABLE_.ID FROM USER_TABLE LEFT JOIN TABLE_ ON USER_TABLE.TABLE_ID = TABLE_.ID WHERE USER_TABLE.USER_ID = $1 AND USER_TABLE.OWNER = TRUE',
    [user_id]
  )
  var owner = false;
  for (var i in rows)
    if (rows[i].id == tab_id)
      owner = true;
  if (!owner)
    return ({ok: false, message: 'You are not the owner of the tab'});

  // delete tab
  await execQuery(
    'DELETE FROM TABLE_ WHERE ID = $1',
    [tab_id]
  );
  return ({ok: true});
}

async function getCards(column) {
  const { rows } = await execQuery(
    'SELECT * FROM CARD WHERE COLUMN_ID = $1',
    [column.id]
  )
  column.cards = rows
  return column
}

async function getTab(user_id, tab_id) {
  // check if the user has the specified tab
  const { rows } = await execQuery(
    'SELECT COLUMN_.* FROM TABLE_ LEFT JOIN COLUMN_ ON COLUMN_.TABLE_ID = TABLE_.ID WHERE TABLE_.ID = $1',
    [tab_id]
  );
  for (var i in rows) {
    rows[i] = await getCards(rows[i])
  }
  if (rows[0].id == null)
    return [];
  return rows;
}

async function createColumn(user_id, tab_id, title, color, text_color) {
  // check if the user had the specified tab
  const { rows } = await execQuery(
    'INSERT INTO COLUMN_(TITLE, TABLE_ID, COLOR, TEXT_COLOR) VALUES($1, $2, $3, $4) RETURNING *;',
    [title, tab_id, color, text_color]
  )
  return rows[0].id;
}

async function deleteColumn(user_id, col_id) {
  // get col object, get table ID
  // check if the user had the specified tab
  const { rows } = await execQuery(
    'DELETE FROM COLUMN_ WHERE ID = $1',
    [col_id]
  )
  return rows;
}

async function createCard(user_id, title, col_id, color, text_color) {
  // get col object, get table ID
  // check if the user had the specified tab
  const { rows } = await execQuery(
    'INSERT INTO CARD(TITLE, COLUMN_ID, COLOR, TEXT_COLOR) VALUES($1, $2, $3, $4) RETURNING *;',
    [title, col_id, color, text_color]
  )
  return rows;
}

async function deleteCard(user_id, card_id) {
  // get col object, get table ID
  // check if the user has the specified tab
  const { rows } = await execQuery(
    'DELETE FROM CARD WHERE ID = $1',
    [card_id]
  )
  return rows
}

var db = { register, login, getTabs, createTab, deleteTab, getTab, createColumn, deleteColumn, createCard, deleteCard }
module.exports = db