module.exports = (sequelize, Sequelize) => {
  const Brus = sequelize.define("brus", {
    name: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.INTEGER,
    },
    description: {
      type: Sequelize.STRING,
    },
  });

  Brus.associate = (models) => {
    Brus.belongsTo(models.user, {
      foreignKey: "userId",
      as: "user",
    });
  };
  return Brus;
};
