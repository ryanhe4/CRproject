module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define('Log', {
        title: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        link: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    Log.associate = (db) => {
        db.Log.belongsTo(db.Url);
    };

    return Log;
}
