import axios from 'axios'
import express from 'express'
import db from '../../api/db'

var router = express.Router();

/**
 * POST
 * /api/checklist/create
 */
router.post('/create', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "user not auth" })
  if (!req.body.cardID || !req.body.title || req.body.position == undefined)
    return res.status(400).json({ message: "missing required fields" })
  const resp = await db.createChecklist(req.session.user.id, req.body.cardID, req.body.title, req.body.position)
  return res.status(resp.status).json(resp.data)
})

/**
 * POST
 * /api/checklist/delete
 */
router.post('/delete', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "user not auth" })
  if (!req.body.checklistID)
    return res.status(400).json({ message: "missing required fields" })
  const resp = await db.deleteChecklist(req.session.user.id, req.body.checklistID)
  return res.status(resp.status).json(resp.data)
})

/**
 * POST
 * /api/checlist/addElem
 */
router.post('/addElem', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "user not auth" })
  if (!req.body.checklistID, !req.body.title || req.body.position == undefined)
    return res.status(400).json({ message: "missing required fields" })
  const resp = await db.addElemChecklist(req.session.user.id, req.body.checklistID, req.body.title, req.body.position)
  return res.status(resp.status).json(resp.data)
})

/**
 * POST
 * /api/checlist/removeElem
 */
router.post('/removeElem', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "user not auth" })
  if (!req.body.checklistElemID)
    return res.status(400).json({ message: "missing required fields" })
  const resp = await db.removeElemChecklist(req.session.user.id, req.body.checklistElemID)
  return res.status(resp.status).json(resp.data)
})

/**
 * POST
 * /api/checlist/modifyElem
 */
router.post('/modifyElem', async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "user not auth" })
  if (!req.body.checklistElemID)
    return res.status(400).json({ message: "missing required fields" })
  const resp = await db.modifyElemChecklist(req.session.user.id, req.body.checklistElemID, req.body.checked, req.body.title, req.body.position)
  return res.status(resp.status).json(resp.data)
})

module.exports = router;