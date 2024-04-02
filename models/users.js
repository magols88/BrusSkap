module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        team: {
            type: Sequelize.STRING,
        }
    });

    User.associate = (models) => {  
        User.hasMany(models.brus, {
            foreignKey: "userId",
            as: "brus",
        });
    };

    return User;
};