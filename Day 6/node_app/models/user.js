'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, {
        foreignKey: 'userId',
        as: 'userPosts',
      });
    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING,
      get() {   //getter
        const rawValue = this.getDataValue('firstName');
        return rawValue ? rawValue.toUpperCase() : null;
      }
    },
    lastName: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('lastName');
        return rawValue ? rawValue.toUpperCase() : null;
      }
    },
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set(value) {   //setter
        // Storing passwords in plaintext in the database is terrible.
        // Hashing the value with an appropriate cryptographic hash function is better.
        // Using the username as a salt is better.
        this.setDataValue('password', hash(this.username + value));
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};