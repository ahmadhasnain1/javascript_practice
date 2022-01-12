'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  };
  Post.init({
    content: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
          is: /^[0-9a-f]{255}$/i,
          isAlphanumeric: true,
          notNull: true,
          notEmpty: true,
          min: 1,
          max: 255
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};