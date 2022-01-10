var express = require('express');
var router = express.Router()
var middleware = require('./middlewares/test');


// define the about route
router.get('/', middleware, function (req, res) {
  res.send('\n hello world')
})

module.exports = router