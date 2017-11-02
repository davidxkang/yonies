module.exports = (sequelize, DataTypes) => {
  const RoomStat = sequelize.define('roomstat', {
    room_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    category_id: {
      type: DataTypes.INTEGER
    },
    person_count: {
      type: DataTypes.INTEGER
    },
    host_id: {
      type: DataTypes.INTEGER
    },
    duration: {
      type: DataTypes.STRING
    },
    room_info: {
      type: DataTypes.STRING
    },
    video_url: {
      type: DataTypes.STRING
    }
  },
    {
      timestamps: false
    }
  );
  return RoomStat;
} 