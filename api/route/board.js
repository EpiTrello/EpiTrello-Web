import axios from 'axios'
import express from 'express'
import db from '../../api/db'

var router = express.Router();

/**
 * POST
 * /api/board/getAll
 */
router.get('/getAll', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "user not auth" })
  const resp = await db.getBoards(req.session.user.id)
  return res.status(resp.status).json(resp.data)
})


/**
 * POST
 * /api/board/create
 */
router.post('/create', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "user not auth" })
  if (!req.body.title)
    return res.status(400).json({ message: "missing required fields" })
  const resp = await db.createBoard(req.session.user.id, req.body.title)
  return res.status(resp.status).json(resp.data)
})

/**
 * POST
 * /api/board/delete
 */
router.post('/delete', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "user not auth" })
  if (!req.body.boardID)
    return res.status(400).json({ message: "missing required fields" })
  const resp = await db.deleteBoard(req.session.user.id, req.body.boardID)
  return res.status(resp.status).json(resp.data)
})


/**
 * POST
 * /api/board/getID
 */
router.post('/getID', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "user not auth" })
  if (!req.body.boardID)
    return res.status(400).json({ message: "missing required fields" })
  const resp = await db.getBoard(req.session.user.id, req.body.boardID)
  return res.status(resp.status).json(resp.data)
})

/**
 * POST
 * /api/board/getName
 */
router.post('/getName', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "user not auth" })
  if (!req.body.boardID)
    return res.status(400).json({ message: "missing required fields" })
  const resp = await db.getBoardName(req.session.user.id, req.body.boardID)
  return res.status(resp.status).json(resp.data)
})

/**
 * POST
 * /api/board/leave
 */
router.post('/leave', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "user not auth" })
  if (!req.body.boardID)
    return res.status(400).json({ message: "missing required fields" })
  const resp = await db.leaveBoard(req.session.user.id, req.body.boardID)
  return res.status(resp.status).json(resp.data)
})

/**
 * POST
 * /api/board/getUsers
 */
router.post('/getUsers', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "user not auth" })
  if (!req.body.boardID)
    return res.status(400).json({ message: "missing required fields" })
  const resp = await db.getBoardUsers(req.session.user.id, req.body.boardID)
  return res.status(resp.status).json(resp.data)
})


/**
 * POST
 * /api/board/addUser
 */
router.post('/addUser', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "user not auth" })
  if (!req.body.userID || !req.body.boardID)
    return res.status(400).json({ message: "missing required fields" })
  const resp = await db.addUserToBoard(req.session.user.id, req.body.boardID, req.body.userID)
  return res.status(resp.status).json(resp.data)
})


module.exports = router;