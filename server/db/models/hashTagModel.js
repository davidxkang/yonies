module.exports = (sequelize, DataTypes) => {
  const HashTag = sequelize.define('hashtag', {
    post_id: {
      type: DataTypes.INTEGER
    },
    label: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  })
  return HashTag
}