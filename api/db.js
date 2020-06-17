const { Pool } = require('pg')
const bcrypt = require('bcrypt')
// salt is the encryption key used to encode / decode
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
var pool = new Pool({ connectionString: process.env.DATABASE_URL });


function makeResp(status, data) {
  return {
    status: status,
    data: data
  }
}

function execQuery(query, values) {
  return pool.query(query, values)
}

async function checkHasBoardFromBoardID(board_id, user_id) {
  const board = await execQuery(
    'SELECT BOARD.ID FROM USER_BOARD LEFT JOIN BOARD ON USER_BOARD.BOARD_ID = BOARD.ID WHERE USER_BOARD.USER_ID = $1 AND USER_BOARD.OWNER = TRUE',
    [user_id]
  )
  if (!board.rows[0])
    return false
  var has = false;
  for (var i in board.rows)
    if (board.rows[i].id == board_id)
      has = true
  return (has)
}

async function checkHasBoardFromColID(col_id, user_id) {
  // check if the specified column exist
  const col = await execQuery(
    'SELECT * FROM COLUMN_ WHERE ID = $1',
    [col_id]
  )
  if (!col.rows[0])
    return false
  return checkHasBoardFromBoardID(col.rows[0].board_id, user_id)
}

async function checkHasBoardFromCardID(card_id, user_id) {
  const card = await execQuery(
    'SELECT * FROM CARD WHERE ID = $1',
    [card_id]
  )
  if (!card.rows[0])
    return false
  return checkHasBoardFromColID(card.rows[0].column_id)
}

async function register(username, password) {
  const query = 'SELECT * FROM USER_ WHERE USERNAME = $1'
  const values = [username]
  const { rows } = await execQuery(query, values);
  if (rows.length != 0)
    return makeResp(403, { message: "username already exist" })
  const query_insert = 'INSERT INTO USER_(username, password) VALUES($1, $2) RETURNING *;'
  const hash = bcrypt.hashSync(password, salt);
  const values_insert = [username, hash];
  const q = await execQuery(query_insert, values_insert);
  return makeResp(200, { id: q.rows[0].id, username: q.rows[0].username })
}


async function login(username, password) {
  const query = 'SELECT * FROM USER_ WHERE USERNAME = $1';
  const values = [username];
  const { rows } = await execQuery(query, values);
  if (rows.length == 0)
    return makeResp(400, { message: "Wrong username / password combinaison" })
  const hash = bcrypt.hashSync(rows[0].password, salt);
  if (!bcrypt.compareSync(rows[0].password, hash))
    return makeResp(400, { message: "Wrong username / password combinaison" })
  return makeResp(200, { id: rows[0].id })
}

async function createBoard(user_id, title) {
  const { rows } = await execQuery(
    'INSERT INTO BOARD(TITLE) VALUES($1) RETURNING *;',
    [title]
  )
  await execQuery(
    'INSERT INTO USER_BOARD(USER_ID, BOARD_ID, OWNER) VALUES($1, $2, TRUE);',
    [user_id, rows[0].id]
  )
  return makeResp(200, rows[0])
}

async function getBoards(user_id) {
  const { rows } = await execQuery(
    'SELECT BOARD.* FROM USER_BOARD LEFT JOIN BOARD ON USER_BOARD.BOARD_ID = BOARD.ID WHERE USER_BOARD.USER_ID = $1',
    [user_id]
  );
  return makeResp(200, rows)
}

async function deleteBoard(user_id, board_id) {
  // check board access
  if (await checkHasBoardFromBoardID(board_id, user_id) == false)
    return makeResp(403, { message: "you don't have the specified board" })

  // check board ownership
  const { rows } = await execQuery(
    'SELECT BOARD.ID FROM USER_BOARD LEFT JOIN BOARD ON USER_BOARD.BOARD_ID = BOARD.ID WHERE USER_BOARD.USER_ID = $1 AND USER_BOARD.OWNER = TRUE',
    [user_id]
  )
  var owner = false;
  for (var i in rows)
    if (rows[i].id == board_id)
      owner = true;
  if (!owner)
    return makeResp(403, { message: 'You are not the owner of the board' })

  // delete board
  const q = await execQuery(
    'DELETE FROM BOARD WHERE ID = $1 RETURNING *',
    [board_id]
  );
  if (!q.rows[0])
    return makeResp(400, "board not found")
  return makeResp(200);
}

async function getCards(column) {
  const { rows } = await execQuery(
    'SELECT * FROM CARD WHERE COLUMN_ID = $1',
    [column.id]
  )
  column.cards = rows
  return column
}

async function getBoard(user_id, board_id) {
  // check board access
  if (await checkHasBoardFromBoardID(board_id, user_id) == false)
    return makeResp(403, { message: "you don't have the specified board" })

  // need to retrieve board name
  // get board data
  const { rows } = await execQuery(
    'SELECT COLUMN_.* FROM BOARD LEFT JOIN COLUMN_ ON COLUMN_.BOARD_ID = BOARD.ID WHERE BOARD.ID = $1',
    [board_id]
  );
  if (!rows[0])
    return makeResp(400, { message: "board not found" })
  for (var i in rows) {
    rows[i] = await getCards(rows[i])
  }
  if (!rows[0] || rows[0].id == null)
    return makeResp(200);
  return makeResp(200, rows);
}

async function createColumn(user_id, board_id, title, color, text_color) {
  // check board access
  if (await checkHasBoardFromBoardID(board_id, user_id) == false)
    return makeResp(403, { message: "you don't have the specified board" })

  // create column object
  const { rows } = await execQuery(
    'INSERT INTO COLUMN_(TITLE, BOARD_ID, COLOR, TEXT_COLOR) VALUES($1, $2, $3, $4) RETURNING *;',
    [title, board_id, color, text_color]
  )
  rows.status = 200
  return makeResp(200, { id: rows[0].id })
}

async function deleteColumn(user_id, col_id) {
  // check board access
  if (await checkHasBoardFromColID(col_id, user_id) == false)
    return makeResp(403, { message: "you don't have the specified board / column not found" })

  // delete column object
  const { rows } = await execQuery(
    'DELETE FROM COLUMN_ WHERE ID = $1 RETURNING *',
    [col_id]
  )
  if (!rows[0])
    return makeResp(400, { message: "column not found" })
  return makeResp(200)
}


async function createCard(user_id, title, col_id, color, text_color) {
  // check board access
  if (await checkHasBoardFromColID(col_id, user_id) == false)
    return makeResp(403, { message: "you don't have the specified board / column not found" })

  // create card object
  const { rows } = await execQuery(
    'INSERT INTO CARD(TITLE, COLUMN_ID, COLOR, TEXT_COLOR) VALUES($1, $2, $3, $4) RETURNING *;',
    [title, col_id, color, text_color]
  )
  return makeResp(200, rows)
}

async function deleteCard(user_id, card_id) {
  // check board access
  if (await checkHasBoardFromCardID(card_id, user_id) == false)
    return makeResp(403, { message: "you don't have the specified board / card not found / column not found" })

  // delete card object
  const { rows } = await execQuery(
    'DELETE FROM CARD WHERE ID = $1',
    [card_id]
  )
  if (!rows[0])
    return makeResp(400, { message: "card not found" })
  return makeResp(200)
}

async function leaveBoard(user_id, board_id) {
  // check board access
  if (await heckHasBoardFromBoardID(board_id, user_id) == false)
    return makeResp(403, { message: "you don't have the specified board" })

  // leave board
  const { rows } = await execQuery(
    'DELETE FROM USER_BOARD WHERE USER_ID = $1 AND BOARD_ID = $2',
    [user_id, board_id]
  )
  // Need to be tested
  return makeResp(200, rows)
}

async function searchUser(user_id, user_name) {
  const { rows } = await execQuery(
    'SELECT id, username FROM USER_ WHERE username LIKE $1',
    ['%' + user_name + '%']
  )
  return makeResp(200, rows)
}

async function addFriend(user_id, friend_username) {
  const { rows } = await execQuery(
    'SELECT id FROM USER_ WHERE username = $1',
    [friend_username]
  )
  if (!rows[0])
    return makeResp(400, { message: 'user not found' })
  if (rows[0].id == user_id)
    return makeResp(403, { message: 'cannot self-add' })
  return makeResp(200, rows)
}

var db = {
  register,
  login,
  getBoards,
  createBoard,
  deleteBoard,
  getBoard,
  createColumn,
  deleteColumn,
  createCard,
  deleteCard,
  leaveBoard,
  searchUser,
  addFriend
}

module.exports = db