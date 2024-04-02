module.exports = (sequelize, Sequelize) => {
  const Brus = sequelize.define("brus", {
    name: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.INTEGER,
    },
  });

  Brus.associate = (models) => {
    Brus.hasMany(models.brusKjøp, {
      foreignKey: "brusId",
      as: "brusKjøp",
    });
  };

  return Brus;
};
