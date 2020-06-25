const { Pool } = require('pg')
const bcrypt = require('bcrypt');
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
    'SELECT BOARD.ID FROM USER_BOARD LEFT JOIN BOARD ON USER_BOARD.BOARD_ID = BOARD.ID WHERE USER_BOARD.USER_ID = $1',
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
  return checkHasBoardFromColID(card.rows[0].column_id, user_id)
}

async function checkHasBoardFromTagID(tag_id, user_id) {
  const tag = await execQuery(
    'SELECT * FROM TAG WHERE ID = $1',
    [tag_id]
  )
  if (!tag.rows[0])
    return false
  return checkHasBoardFromBoardID(tag.rows[0].board_id, user_id)
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

  // get board data
  const { rows } = await execQuery(
    'SELECT COLUMN_.* FROM BOARD LEFT JOIN COLUMN_ ON COLUMN_.BOARD_ID = BOARD.ID WHERE BOARD.ID = $1',
    [board_id]
  );
  for (var i in rows) {
    rows[i] = await getCards(rows[i])
  }
  if (!rows[0] || rows[0].id == null)
    return makeResp(200, []);
  return makeResp(200, rows);
}

async function getBoardName(user_id, board_id) {
  // check board access
  if (await checkHasBoardFromBoardID(board_id, user_id) == false)
    return makeResp(403, { message: "you don't have the specified board" })

  // get board name
  const { rows } = await execQuery(
    'SELECT TITLE FROM BOARD WHERE ID = $1',
    [board_id]
  )
  return makeResp(200, rows[0])
}
async function createColumn(user_id, board_id, title, color, text_color, position) {
  // check board access
  if (await checkHasBoardFromBoardID(board_id, user_id) == false)
    return makeResp(403, { message: "you don't have the specified board" })

  // create column object
  const { rows } = await execQuery(
    'INSERT INTO COLUMN_(TITLE, BOARD_ID, COLOR, TEXT_COLOR, POSITION) VALUES($1, $2, $3, $4, $5) RETURNING *;',
    [title, board_id, color, text_color, position]
  )
  return makeResp(200, { id: rows[0].id })
}

async function modifyColumn(user_id, col_id, title, col_id, color, text_color, position) {
  // check board access
  if (await checkHasBoardFromColID(col_id, user_id) == false)
    return makeResp(403, { message: "you don't have the specified board / column not found" })

  // get previous values
  const p = await execQuery(
    'SELECT * FROM COLUMN_ WHERE ID = $1',
    [col_id]
  )
  const previous_values = p.rows[0];

  // modify values
  const { rows } = await execQuery(
    'UPDATE COLUMN_ SET TITLE = $1, COLOR = $2, TEXT_COLOR = $3, POSITION = $4 WHERE ID = $5 RETURNING *',
    [title ? title : previous_values.title,
    color ? color : previous_values.color,
    text_color ? text_color : previous_values.text_color,
    position ? position : previous_values.position,
      col_id]
  )
  return makeResp(200, rows[0])
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

async function createCard(user_id, title, col_id, color, text_color, position) {
  // check board access
  if (await checkHasBoardFromColID(col_id, user_id) == false)
    return makeResp(403, { message: "you don't have the specified board / column not found" })

  // create card object
  const { rows } = await execQuery(
    'INSERT INTO CARD(TITLE, COLUMN_ID, COLOR, TEXT_COLOR, POSITION) VALUES($1, $2, $3, $4, $5) RETURNING *;',
    [title, col_id, color, text_color, position]
  )
  return makeResp(200, rows[0])
}

async function deleteCard(user_id, card_id) {
  // check board access
  if (await checkHasBoardFromCardID(card_id, user_id) == false) {
    return makeResp(403, { message: "you don't have the specified board / card not found / column not found" })
  }

  // delete card object
  const { rows } = await execQuery(
    'DELETE FROM CARD WHERE ID = $1 RETURNING *',
    [card_id]
  )
  if (!rows[0])
    return makeResp(400, { message: "card not found" })
  return makeResp(200)
}

async function modifyCard(user_id, card_id, title, col_id, color, text_color, position) {
  // check board access
  if (await checkHasBoardFromCardID(card_id, user_id) == false)
    return makeResp(403, { message: "you don't have the specified board / column not found" })

  // get previous values
  const p = await execQuery(
    'SELECT * FROM CARD WHERE ID = $1',
    [card_id]
  )
  const previous_values = p.rows[0];

  // modify values
  const { rows } = await execQuery(
    'UPDATE CARD SET TITLE = $1, COLUMN_ID = $2, COLOR = $3, TEXT_COLOR = $4, POSITION = $5 WHERE ID = $6 RETURNING *',
    [title ? title : previous_values.title,
    col_id ? col_id : previous_values.column_id,
    color ? color : previous_values.color,
    text_color ? text_color : previous_values.text_color,
    position ? position : previous_values.position,
      card_id]
  )
  return makeResp(200, rows[0])
}

async function leaveBoard(user_id, board_id) {
  // check board access
  if (await checkHasBoardFromBoardID(board_id, user_id) == false)
    return makeResp(403, { message: "you don't have the specified board" })

  // leave board
  const { rows } = await execQuery(
    'DELETE FROM USER_BOARD WHERE USER_ID = $1 AND BOARD_ID = $2 RETURNING *',
    [user_id, board_id]
  )

  // delete board if the user is the board owner
  if (rows[0].owner == true)
    await deleteBoard(user_id, board_id)

  return makeResp(200)
}

async function searchUser(user_id, user_name) {
  const { rows } = await execQuery(
    'SELECT id, username FROM USER_ WHERE username LIKE $1',
    ['%' + user_name + '%']
  )
  return makeResp(200, rows)
}

async function addUserToBoard(user_id, board_id, other_id) {
  // check board access
  if (await checkHasBoardFromBoardID(board_id, user_id) == false)
    return makeResp(403, { message: "you don't have the specified board" })

  // error handler
  if (user_id == other_id)
    return makeResp(403, { message: 'cannot self-add' })

  const r = await execQuery(
    'SELECT * FROM USER_BOARD WHERE USER_ID = $1 AND BOARD_ID = $2',
    [other_id, board_id]
  )
  if (r.rows[0])
    return makeResp(403, { message: "user is already in the board" })

  // add to board
  const { rows } = await execQuery(
    'INSERT INTO USER_BOARD(USER_ID, BOARD_ID, OWNER) VALUES($1, $2, FALSE) RETURNING *;',
    [other_id, board_id]
  )
  return makeResp(200, rows[0])
}

async function getBoardUsers(user_id, board_id) {
  // check board access
  if (await checkHasBoardFromBoardID(board_id, user_id) == false)
    return makeResp(403, { message: "you don't have the specified board" })

  // get all users
  const { rows } = await execQuery(
    'SELECT USER_.USERNAME, USER_.ID FROM USER_BOARD LEFT JOIN USER_ ON USER_BOARD.USER_ID = USER_.ID WHERE USER_BOARD.BOARD_ID = $1',
    [board_id]
  )
  return makeResp(200, rows)
}

async function createTag(user_id, board_id, title) {
  // check board access
  if (await checkHasBoardFromBoardID(board_id, user_id) == false)
    return makeResp(403, { message: "you don't have the specified board" })

  // create tag
  const { rows } = await execQuery(
    'INSERT INTO TAG(TITLE, BOARD_ID) VALUES($1, $2) RETURNING *;',
    [title, board_id]
  )
  return makeResp(200, rows[0])
}

async function deleteTag(user_id, tag_id) {
  // check board access
  if (await checkHasBoardFromTagID(tag_id, user_id) == false)
    return makeResp(403, { message: "you don't have the specified board" })

  // delete tag object
  const { rows } = await execQuery(
    'DELETE FROM TAG WHERE ID = $1 RETURNING *',
    [tag_id]
  )
  if (!rows[0])
    return makeResp(400, { message: "tag not found" })
  return makeResp(200)
}

async function getAllTags(user_id, board_id) {
  // check board access
  if (await checkHasBoardFromBoardID(board_id, user_id) == false)
    return makeResp(403, { message: "you don't have the specified board" })

  // get all tags
  const { rows } = await execQuery(
    'SELECT * FROM TAG WHERE BOARD_ID = $1',
    [board_id]
  )
  return makeResp(200, rows)
}

var db = {
  register,
  login,
  getBoards,
  createBoard,
  deleteBoard,
  getBoard,
  getBoardName,
  createColumn,
  deleteColumn,
  createCard,
  deleteCard,
  leaveBoard,
  searchUser,
  addUserToBoard,
  modifyCard,
  modifyColumn,
  getBoardUsers,
  createTag,
  deleteTag,
  getAllTags
}

module.exports = db