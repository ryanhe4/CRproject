module.exports = (sequelize, DataTypes) => {
    const Url = sequelize.define('Url', {
        url: {
            type: DataTypes.STRING(500),
            allowNull: false,
            unique: true,
        },
        lastUpdate: {
            type: DataTypes.STRING(30),
            allowNull: true,
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    Url.associate = (db) => {
        db.Url.belongsToMany(db.Email, {through: 'UrlEmail'});
        db.Url.hasMany(db.Log);

    };

    return Url;
};
