var express = require('express');
var router = express.Router()
var middleware = require('../middlewares/test');
const testController = require('../controllers/test');

// define the about route
router.get('/', middleware.timeLog, testController.printHelloWorld);

module.exports = router