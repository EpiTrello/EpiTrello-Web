import express from 'express'

const router = express.Router()

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})


// Routes
const auth = require('./route/auth');
const board = require('./route/board');
const user = require('./route/user');
const column = require('./route/column');
const card = require('./route/card');

router.use('/auth', auth)
router.use('/board', board)
router.use('/user', user)
router.use('/column', column)
router.use('/card', card)

// Export the server middleware
export default {
  path: '/api',
  handler: router
}