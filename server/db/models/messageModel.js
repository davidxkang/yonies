module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    video_dm: {
      type: DataTypes.STRING
    },
    message_dm: {
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    friend_id: {
      type: DataTypes.INTEGER
    }
  },
  {
    timestamps: false,
  });
  return Message;
} 