import axios from 'axios'
import express from 'express'
import db from '../../api/db'

var router = express.Router();

/**
 * POST
 * /api/card/create
 */
router.post('/create', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "user not auth" })
  if (!req.body.title || !req.body.columnID || !req.body.color || !req.body.textColor || req.body.position == undefined)
    return res.status(400).json({ message: "missing required fields" })
  const resp = await db.createCard(req.session.user.id, req.body.title, req.body.columnID, req.body.color, req.body.textColor, req.body.position)
  return res.status(resp.status).json(resp.data)
})

/**
 * POST
 * /api/card/modify
 */
router.post('/modify', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "user not auth" })
  if (!req.body.cardID)
    return res.status(400).json({ message: "missing required fields" })
  const resp = await db.modifyCard(req.session.user.id, req.body.cardID, req.body.title, req.body.columnID, req.body.color, req.body.textColor, req.body.position)
  return res.status(resp.status).json(resp.data)
})

/**
 * POST
 * /api/card/delete
 */
router.post('/delete', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "user not auth" })
  if (!req.body.cardID)
    return res.status(400).json({ message: "missing required fields" })
  const resp = await db.deleteCard(req.session.user.id, req.body.cardID)
  return res.status(resp.status).json(resp.data)
})


module.exports = router;