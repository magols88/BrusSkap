module.exports = (sequelize, Sequelize) => {
  const BrusKjøp = sequelize.define("brusKjøp", {
    userId: {
      type: Sequelize.INTEGER,
    },
    brusId: {
      type: Sequelize.INTEGER,
    },
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
  });

  BrusKjøp.associate = (models) => {
    BrusKjøp.belongsTo(models.user, {
      foreignKey: "userId",
      as: "user",
    });
    BrusKjøp.belongsTo(models.brus, {
      foreignKey: "brusId",
      as: "brus",
    });
  };
  return BrusKjøp;
};
