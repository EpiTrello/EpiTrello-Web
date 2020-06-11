import axios from 'axios'
import express from 'express'
import db from '../../api/db'

var router = express.Router();

/**
 * POST
 * /api/db/getTabs
 */
router.post('/getTabs', async (req, res) => {
  if (!req.session.user)
    return res.status(400).json({ ok: false, message: "user not auth" })
  const resp = await db.getTabs(req.session.user.id)
  return res.json(resp)
})


/**
 * POST
 * /api/db/createTab
 */
router.post('/createTab', async (req, res) => {
  if (!req.session.user)
    return res.status(400).json({ ok: false, message: "user not auth" })
  if (!req.body.title)
    return res.status(401).json({ ok: false, message: "missing required fields" })
  const resp = await db.createTab(req.session.user.id, req.body.title)
  return res.json(resp)
})


module.exports = router;