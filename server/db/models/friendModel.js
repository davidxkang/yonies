module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define('friend', {
    user_id: {
      type: DataTypes.STRING
    },
    friend_id: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
  })
  return Friend
}