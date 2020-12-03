module.exports = (sequelize, DataTypes) => {
    const Weather = sequelize.define(
        'weather',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            city: {
                type: DataTypes.TEXT,
                allowNull: false,
                unique: 'city_state',
            },
            zip: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            temperature_f: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            pressure: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            humidity: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {}
    );

    return Weather;
};
