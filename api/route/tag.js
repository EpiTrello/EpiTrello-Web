import axios from 'axios'
import express from 'express'
import db from '../../api/db'

var router = express.Router();

/**
 * POST
 * /api/tag/create
 */
router.post('/create', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "user not auth" })
  if (!req.body.boardID || !req.body.title)
    return res.status(400).json({ message: "missing required fields" })
  const resp = await db.createTag(req.session.user.id, req.body.boardID, req.body.title)
  return res.status(resp.status).json(resp.data)
})

/**
 * POST
 * /api/tag/delete
 */
router.post('/delete', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "user not auth" })
  if (!req.body.tagID)
    return res.status(400).json({ message: "missing required fields" })
  const resp = await db.deleteTag(req.session.user.id, req.body.tagID)
  return res.status(resp.status).json(resp.data)
})

/**
 * POST
 * /api/tag/getAll
 */
router.post('/getAll', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "user not auth" })
  if (!req.body.boardID)
    return res.status(400).json({ message: "missing required fields" })
  const resp = await db.getAllTags(req.session.user.id, req.body.boardID)
  return res.status(resp.status).json(resp.data)
})

module.exports = router;