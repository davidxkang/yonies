module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    uid: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING
    },
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    admin_status: {
      type: DataTypes.BOOLEAN
    },
    age: {
      type: DataTypes.INTEGER
    },
    gender: {
      type: DataTypes.STRING
    },
    street_address: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    zip_code: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
  });
  return User;
};  