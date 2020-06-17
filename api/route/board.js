import axios from 'axios'
import express from 'express'
import db from '../../api/db'

var router = express.Router();

/**
 * POST
 * /api/board/getBoards
 */
router.get('/getBoards', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ ok: false, message: "user not auth" })
  const resp = await db.getBoards(req.session.user.id)
  return res.status(resp.status).json(resp.data)
})


/**
 * POST
 * /api/board/createBoard
 */
router.post('/createBoard', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ ok: false, message: "user not auth" })
  if (!req.body.title)
    return res.status(400).json({ ok: false, message: "missing required fields" })
  console.log(req.session.user)
  const resp = await db.createBoard(req.session.user.id, req.body.title)
  return res.status(resp.status).json(resp.data)
})

/**
 * POST
 * /api/board/deleteBoard
 */
router.post('/deleteBoard', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ ok: false, message: "user not auth" })
  if (!req.body.boardID)
    return res.status(400).json({ ok: false, message: "missing required fields" })
  const resp = await db.deleteBoard(req.session.user.id, req.body.boardID)
  return res.status(resp.status).json(resp.data)
})


/**
 * POST
 * /api/board/getBoard
 */
router.post('/getBoard', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ ok: false, message: "user not auth" })
  if (!req.body.boardID)
    return res.status(400).json({ ok: false, message: "missing required fields" })
  const resp = await db.getBoard(req.session.user.id, req.body.boardID)
  return res.status(resp.status).json(resp.data)
})

/**
 * POST
 * /api/board/createColumn
 */
router.post('/createColumn', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ ok: false, message: "user not auth" })
  if (!req.body.boardID || !req.body.title || !req.body.color || !req.body.textColor)
    return res.status(400).json({ ok: false, message: "missing required fields" })
  const resp = await db.createColumn(req.session.user.id, req.body.boardID, req.body.title, req.body.color, req.body.textColor)
  return res.status(resp.status).json(resp.data)
})

/**
 * POST
 * /api/board/deleteColumn
 */
router.post('/deleteColumn', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ ok: false, message: "user not auth" })
  if (!req.body.columnID)
    return res.status(400).json({ ok: false, message: "missing required fields" })
  const resp = await db.deleteColumn(req.session.user.id, req.body.columnID)
  return res.status(resp.status).json(resp.data)
})


/**
 * POST
 * /api/board/createCard
 */
router.post('/createCard', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ ok: false, message: "user not auth" })
  if (!req.body.title || !req.body.columnID || !req.body.color || !req.body.textColor)
    return res.status(400).json({ ok: false, message: "missing required fields" })
  const resp = await db.createCard(req.session.user.id, req.body.title, req.body.columnID, req.body.color, req.body.textColor)
  return res.status(resp.status).json(resp.data)
})

/**
 * POST
 * /api/board/deleteCard
 */
router.post('/deleteCard', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ ok: false, message: "user not auth" })
  if (!req.body.cardID)
    return res.status(400).json({ ok: false, message: "missing required fields" })
  const resp = await db.deleteCard(req.session.user.id, req.body.cardID)
  return res.status(resp.status).json(resp.data)
})

/**
 * POST
 * /api/leaveBoard
 */
router.post('/leaveBoard', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ ok: false, message: "user not auth" })
  if (!req.body.boardID)
    return res.status(400).json({ ok: false, message: "missing required fields" })
  const resp = await db.leaveBoard(req.session.user.id, req.body.boardID)
  return res.status(resp.status).json(resp.data)
})

module.exports = router;