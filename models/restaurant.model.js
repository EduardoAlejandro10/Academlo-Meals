const {db, DataTypes} = require('../utils/database.util');


const Restaurant = db.define('restaurants', {
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

  address: {
    type: DataTypes.STRING,
    allowNull: false
  
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0 
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active'
  }
});

module.exports = { Restaurant };