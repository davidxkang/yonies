module.exports = (sequelize, DataTypes) => {
  const Participant = sequelize.define('participant', {
    user_id: {
      type: DataTypes.INTEGER
    },
    room_id: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false,
  })
  return Participant
}