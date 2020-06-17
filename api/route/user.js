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
    return res.status(400).json({ ok: false, message: "user not auth" })
  if (!req.body.username)
    return res.status(401).json({ ok: false, message: "missing required fields" })
  const resp = await db.searchUser(req.session.user.id, req.body.username)
  return res.json(resp)
})

module.exports = router;