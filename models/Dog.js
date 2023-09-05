const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Dogs extends Model {}

Dogs.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    friendly_to_kids: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    friendly_to_animals: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    adoption_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING, //For now...it's string...
      allowNull: false,
      length: [255],
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      length: [255],
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Dogs",
  }
);

module.exports = Dogs;
