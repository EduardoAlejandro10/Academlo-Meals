const {db, DataTypes} = require('../utils/database.util');



const User = db.define('users', {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active'
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'normal'
  }
});


module.exports = { User };