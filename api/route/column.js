import axios from 'axios'
import express from 'express'
import db from '../../api/db'

var router = express.Router();

/**
 * POST
 * /api/column/create
 */
router.post('/create', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "user not auth" })
  if (!req.body.boardID || !req.body.title || !req.body.color || !req.body.textColor || req.body.position == undefined)
    return res.status(400).json({ message: "missing required fields" })
  const resp = await db.createColumn(req.session.user.id, req.body.boardID, req.body.title, req.body.color, req.body.textColor, req.body.position)
  return res.status(resp.status).json(resp.data)
})

/**
 * POST
 * /api/column/modify
 */
router.post('/modify', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "user not auth" })
  if (!req.body.columnID)
    return res.status(400).json({ message: "missing required fields" })
  const resp = await db.modifyColumn(req.session.user.id, req.body.columnID, req.body.title, req.body.columnID, req.body.color, req.body.textColor, req.body.position)
  return res.status(resp.status).json(resp.data)
})

/**
 * POST
 * /api/column/delete
 */
router.post('/delete', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "user not auth" })
  if (!req.body.columnID)
    return res.status(400).json({ message: "missing required fields" })
  const resp = await db.deleteColumn(req.session.user.id, req.body.columnID)
  return res.status(resp.status).json(resp.data)
})

module.exports = router;