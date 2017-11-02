module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('follow', {
    follow_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    category_id: {
      type: DataTypes.INTEGER
    },
    uid: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  })
  return Follow
}