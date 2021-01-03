module.exports = (sequelize, DataTypes) => {
    const Email = sequelize.define('Email', {
        email: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    Email.associate = (db) => {
        db.Email.belongsToMany(db.Url, {through: 'UrlEmail'});
    };

    return Email;
}
