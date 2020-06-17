import axios from 'axios'
import express from 'express'
import db from '../../api/db'

var router = express.Router();

/**
 * POST
 * /api/user/search
 */
router.post('/search', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "user not auth" })
  if (!req.body.username)
    return res.status(400).json({ message: "missing required fields" })
  const resp = await db.searchUser(req.session.user.id, req.body.username)
  return res.status(resp.status).json(resp.data)
})

/**
 * POST
 * /api/user/addToBoard
 */
router.post('/addToBoard', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "user not auth" })
  if (!req.body.userID || !req.body.boardID)
    return res.status(400).json({ message: "missing required fields" })
  const resp = await db.addToBoard(req.session.user.id, req.body.boardID, req.body.userID)
  return res.status(resp.status).json(resp.data)
})

module.exports = router;