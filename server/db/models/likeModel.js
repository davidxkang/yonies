module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('like', {
    uid: {
      type: DataTypes.STRING
    },
    post_id: {
      type: DataTypes.INTEGER
    },
    type: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
  });
  return Like;
};  