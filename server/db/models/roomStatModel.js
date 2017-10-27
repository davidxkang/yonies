'use strict'

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
    peer_id: {
      type: DataTypes.STRING
    }
  });
  return RoomStat;
} 


// RoomStat.belongsTo(User);
// RoomState.hasMany(Participant);

// RoomStat.sync();

// module.exports = RoomStat;