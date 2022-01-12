const UserModel = require('../models').User;
const PostModel = require('../models').Post;


const printHelloWorld = (req, res) => {
    res.send('\n hello world')
};

const getAllUsers = async(req, res) => {
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
      if(!e.status) {
        res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } });
      } else {
          res.status(e.status).json( { error: { code: e.code, message: e.message } });
      }
  }
}

const getUser = async(req, res) => {
  try{
      const user = await UserModel.findOne({
        where: {
          id: req.params.user_id
        }
      });
      if (user === null) {
        res.send('user not found against that id');
      }
      else
        res.send(user);
  }
  catch(e){
      if(!e.status) {
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

const updateUser = async(req, res) => {
  try{
      let object = {};
      if(req.body.firstName!=null)  object.firstName = req.body.firstName;
      if(req.body.lastName!=null)  object.lastName = req.body.lastName;
      if(req.body.email!=null)  object.email = req.body.email;
      if(req.body.password!=null)  object.password = req.body.password;
      console.log(object);
      UserModel.update(object,{
        where: {
          id: req.body.user_id
        }
      });
      res.send('User updated successfully');
  }
  catch(e){
      if(!e.status) {
        res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } });
      } else {
          res.status(e.status).json( { error: { code: e.code, message: e.message } });
      }
  }
}

const deleteUser = async(req, res) => {
  try{
      UserModel.destroy({
        where: {
          id: req.body.user_id
        }
      });
      res.send('User deleted successfully');
  }
  catch(e){
      if(!e.status) {
        res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } });
      } else {
          res.status(e.status).json( { error: { code: e.code, message: e.message } });
      }
  }
}


module.exports = {
    printHelloWorld,
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
};