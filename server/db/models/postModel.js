module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('post', {
    post_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING
    },
    text: {
      type: DataTypes.STRING({length: 250})
    },
    like_count: {
      type: DataTypes.INTEGER
    },
    parent: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false,
  })
  return Post;
}
