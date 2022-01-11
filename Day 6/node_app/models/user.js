const bcrypt = require('bcrypt');

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
      allowNull: false,
      validate: {
          is: ["^[a-z]+$",'i'],
          isAlpha: {
            args:true,
            msg: "First name only contain alphabets"
          },
          notNull: true,
          notEmpty: true,
          min: 2,
          max: 30
      },
      get() {   //getter
        const rawValue = this.getDataValue('firstName');
        return rawValue ? rawValue.toUpperCase() : null;
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          is: ["^[a-z]+$",'i'],
          isAlpha: {
            args:true,
            msg: "Last name only contain alphabets"
          },
          notNull: true,
          notEmpty: true,
          min: 2,
          max: 30
      },
      get() {
        const rawValue = this.getDataValue('lastName');
        return rawValue ? rawValue.toUpperCase() : null;
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
          isEmail: true,
          notNull: true,
          notEmpty: true,
          min: 2,
          max: 30
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
          notNull: true,
          notEmpty: true,
          min: 5,
          max: 200
      },
      set(value) {   //setter
        // Storing passwords in plaintext in the database is terrible.
        // Hashing the value with an appropriate cryptographic hash function is better.
        this.setDataValue('password', bcrypt.hashSync(value, 10));
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};