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
const index = require('./route/index');

router.use('/auth', auth)
router.use('/', index)

// Export the server middleware
export default {
  path: '/api',
  handler: router
}