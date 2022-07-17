const {db, DataTypes} = require('../utils/database.util');


const Meal = db.define('meals', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active'
  }
});


module.exports = { Meal };