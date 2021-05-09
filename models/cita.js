'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cita extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Cita.init({
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: "Campo não pode ser vazio"
        },
        len:{
          args: [3, 20],
          msg: "Nome deve ter entre 3 e 20 caracteres"
        }
      }
    },
    date: {
     type: DataTypes.INTEGER,
     allowNull: false,
      validate:{
        notEmpty: {
          msg: "Campo não pode ser vazio"
        },
      }
    },
    time: {
    type:  DataTypes.TIME,
    allowNull: false,
      validate:{
        notEmpty: {
          msg: "Campo não pode ser vazio"
        },
      }
    },
    description: {
    type: DataTypes.STRING,
    allowNull: false,
      validate:{
        max: 100,
        notEmpty: {
          msg: "Campo não pode ser vazio"
        },
      }
    },
  }, {
    sequelize,
    modelName: 'Cita',
  });
  return Cita;
};