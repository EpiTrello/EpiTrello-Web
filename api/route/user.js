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
 * /api/user/addFriend
 */
router.post('/addFriend', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "user not auth" })
  if (!req.body.username)
    return res.status(400).json({ message: "missing required fields" })
  const resp = await db.addFriend(req.session.user.id, req.body.username)
  return res.status(resp.status).json(resp.data)
})

module.exports = router;