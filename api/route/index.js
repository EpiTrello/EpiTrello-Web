import axios from 'axios'
import express from 'express'
import db from '../../api/db'

var router = express.Router();

/**
 * POST
 * /api/getTabs
 */
router.get('/getTabs', async (req, res) => {
  if (!req.session.user)
    return res.status(400).json({ ok: false, message: "user not auth" })
  const resp = await db.getTabs(req.session.user.id)
  return res.json(resp)
})


/**
 * POST
 * /api/createTab
 */
router.post('/createTab', async (req, res) => {
  if (!req.session.user)
    return res.status(400).json({ ok: false, message: "user not auth" })
  if (!req.body.title)
    return res.status(401).json({ ok: false, message: "missing required fields" })
  const resp = await db.createTab(req.session.user.id, req.body.title)
  return res.json(resp)
})

/**
 * POST
 * /api/deleteTab
 */
router.post('/deleteTab', async (req, res) => {
  if (!req.session.user)
    return res.status(400).json({ ok: false, message: "user not auth" })
  if (!req.body.tabID)
    return res.status(401).json({ ok: false, message: "missing required fields" })
  const resp = await db.deleteTab(req.session.user.id, req.body.tabID)
  return res.json(resp)
})


/**
 * POST
 * /api/getTab
 */
router.post('/getTab', async (req, res) => {
  if (!req.session.user)
    return res.status(400).json({ ok: false, message: "user not auth" })
  if (!req.body.tabID)
    return res.status(401).json({ ok: false, message: "missing required fields" })
  const resp = await db.getTab(req.session.user.id, req.body.tabID)
  return res.json(resp)
})

/**
 * POST
 * /api/createColumn
 */
router.post('/createColumn', async (req, res) => {
  if (!req.session.user)
    return res.status(400).json({ ok: false, message: "user not auth" })
  if (!req.body.tabID || !req.body.title || !req.body.color || !req.body.textColor)
    return res.status(401).json({ ok: false, message: "missing required fields" })
  const resp = await db.createColumn(req.session.user.id, req.body.tabID, req.body.title, req.body.color, req.body.textColor)
  return res.json(resp)
})

/**
 * POST
 * /api/deleteColumn
 */
router.post('/deleteColumn', async (req, res) => {
  if (!req.session.user)
    return res.status(400).json({ ok: false, message: "user not auth" })
  if (!req.body.columnID)
    return res.status(401).json({ ok: false, message: "missing required fields" })
  const resp = await db.deleteColumn(req.session.user.id, req.body.columnID)
  return res.json(resp)
})


/**
 * POST
 * /api/createCard
 */
router.post('/createCard', async (req, res) => {
  if (!req.session.user)
    return res.status(400).json({ ok: false, message: "user not auth" })
  if (!req.body.title || !req.body.columnID || !req.body.color || !req.body.textColor)
    return res.status(401).json({ ok: false, message: "missing required fields" })
  const resp = await db.createCard(req.session.user.id, req.body.title, req.body.columnID, req.body.color, req.body.textColor)
  return res.json(resp)
})

/**
 * POST
 * /api/deleteCard
 */
router.post('/deleteCard', async (req, res) => {
  if (!req.session.user)
    return res.status(400).json({ ok: false, message: "user not auth" })
  if (!req.body.cardID)
    return res.status(401).json({ ok: false, message: "missing required fields" })
  const resp = await db.deleteCard(req.session.user.id, req.body.cardID)
  return res.json(resp)
})

/**
 * POST
 * /api/leaveTab
 */
router.post('/leaveTab', async (req, res) => {
  if (!req.session.user)
    return res.status(400).json({ ok: false, message: "user not auth" })
  if (!req.body.tabID)
    return res.status(401).json({ ok: false, message: "missing required fields" })
  const resp = await db.leaveTab(req.session.user.id, req.body.cardID)
  return res.json(resp)
})

/**
 * /api/searchUser
 */


module.exports = router;