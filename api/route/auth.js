import axios from 'axios'
import express from 'express'
import db from '../../api/db'

var router = express.Router();

/**
 * POST
 * /api/auth/login
 */
router.post('/login', async (req, res) => {
  console.log(req.body)
  if (!req.body.username || !req.body.password)
    return res.status(400).json({ ok: false, message: "missing required fields" })

  const resp = await db.login(req.body.username, req.body.password)
  if (!resp.ok)
    return res.status(400).json({ ok: false, message: "Wrong username / password combinaison" })

  const user = {
    username: req.body.username,
    id: resp.id
  }
  // Sets session variable (into cookies)
  req.session.user = user
  req.session.loggedIn = true
  return res.json(user)

})

/**
 * POST
 * /api/auth/logout
 */
router.post('/logout', (req, res) => {
  delete req.session.user
  delete req.session.loggedIn
  res.json({ ok: true })
})

/**
 * POST
 * /api/auth/register
 */
router.post('/register', async (req, res) => {
  if (!req.body.username || !req.body.password)
    return res.status(400).json({ ok: false, message: "missing required fields" })
  const resp = await db.register(req.body.username, req.body.password)
  if (!resp.ok)
    return res.status(400).json(resp);
  res.status(200).json({ ok: true });
})

module.exports = router;