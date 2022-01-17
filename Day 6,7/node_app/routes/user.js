var express = require('express');
var router = express.Router()
var middleware = require('../middlewares/user');
const userController = require('../controllers/user');
const emailJob = require('../jobs/email');

// define the about route
router.post('/', middleware.timeLog, userController.printHelloWorld);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         firstName:
 *           type: string
 *           description: The firstName of user
 *         lastName:
 *           type: string
 *           description: The lastName of user
 *         email:
 *           type: string
 *           description: The email of user
 *         password:
 *           type: string
 *           description: The password of user
 *       example:
 *         id: 22
 *         firstName: Ahmad
 *         lastName: Hasnain
 *         email: ahmad.hasnain@invozone.com
 */

 /**
  * @swagger
  * tags:
  *   name: Users
  *   description: The users managing API
  */

/**
 * @swagger
 * /getAll:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.get('/getAll', userController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */
router.get('/getOne/:user_id', userController.getUser);

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Create a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: first_name
 *         schema:
 *           type: string
 *         required: true
 *         description: The user first name
 *         name: last_name
 *         schema:
 *           type: string
 *         required: true
 *         description: The user last name
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The user email
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *         description: The user password 
 *     responses:
 *       201:
 *         description: The newly created user description
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       
 */
router.post('/create', middleware.validateUserCreate ,userController.createUser);
/**
 * @swagger
 * /users/{id}:
 *   post:
 *     summary: Delete the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user is deleted successfully
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */
router.post('/delete', userController.deleteUser);
router.post('/update', userController.updateUser);

router.post('/sendEmail', emailJob.scheduleEmail);

module.exports = router