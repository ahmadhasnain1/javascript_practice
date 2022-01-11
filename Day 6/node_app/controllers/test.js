const UserModel = require('../models').User;
const PostModel = require('../models').Post;


const printHelloWorld = (req, res) => {
    res.send('\n hello world')
};

const getUsers = async(req, res) => {
  try{
    users = await UserModel.findAll({
        include: [{
          model: PostModel,
          as: 'userPosts',
        }],
      });
    res.send(users);
  }
  catch(e){
    if (e.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        msg: e.errors.map(err => err.message)
      })
    }
    else if(!e.status) {
      res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } });
    } else {
        res.status(e.status).json( { error: { code: e.code, message: e.message } });
    }
  }
}

const createUser = async(req, res) => {
  try{
     user = await UserModel.create({
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        password: req.body.password
      })
      res.status(201).send(user);
  }
  catch(e){
    if (e.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        msg: e.errors.map(err => err.message)
      })
    }
    else if(!e.status) {
      res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } });
    } else {
        res.status(e.status).json( { error: { code: e.code, message: e.message } });
    }
  }
}


module.exports = {
    printHelloWorld,
    getUsers,
    createUser
};