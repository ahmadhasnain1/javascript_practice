var express = require('express');
var router = express.Router()
var middleware = require('./middlewares/test');


// define the about route
router.get('/about', middleware, function (req, res) {
  res.send('About birds')
})

module.exports = router