const UserModel = require('../models').User;
const PostModel = require('../models').Post;


const printHelloWorld = (req, res) => {
    res.send('\n hello world')
};

const getUsers = async(req, res) => {
    users = await UserModel.findAll({
        include: [{
          model: PostModel,
          as: 'userPosts',
        }],
      });
    console.log(users);
    res.send(users);
}


module.exports = {
    printHelloWorld,
    getUsers
};