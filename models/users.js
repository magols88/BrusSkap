module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    team: {
      type: Sequelize.STRING,
    },
    totalBrus: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.brusKjøp, {
      foreignKey: "userId",
      as: "brusKjøp",
    });
  };

  return User;
};
