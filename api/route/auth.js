import axios from 'axios'
import express from 'express'
import db from '../../api/db'

var router = express.Router();

/**
 * POST
 * /api/auth/login
 */
router.post('/login', async (req, res) => {
  if (!req.body.username || !req.body.password)
    return res.status(400).json({ message: "missing required fields" })

  const resp = await db.login(req.body.username, req.body.password)
  if (resp.status != 200)
    return res.status(resp.status).json(resp.data)

  const user = {
    id: resp.data.id,
    username: req.body.username
  }
  // Sets session variable (into cookies)
  req.session.user = user
  req.session.loggedIn = true
  return res.status(200).json(user)
})

/**
 * POST
 * /api/auth/logout
 */
router.post('/logout', (req, res) => {
  delete req.session.user
  delete req.session.loggedIn
  res.clearCookie('connect.sid');
  res.status(200).json()
})

/**
 * POST
 * /api/auth/register
 */
router.post('/register', async (req, res) => {
  if (!req.body.username || !req.body.password)
    return res.status(400).json({ ok: false, message: "missing required fields" })
  const resp = await db.register(req.body.username, req.body.password)
  return res.status(resp.status).json(resp.data);
})

module.exports = router;