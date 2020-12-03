const fetch = require('node-fetch');
const { weather } = require('../models');
// const { sequelize } = require('../models');

exports.updateWeather = async (req, res, next) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?zip=${req.params.zip}&units=imperial&appid=${process.env.WEATHER_API_KEY}`;

        const w = await fetch(url);
        const json = await w.json();

        if (json.cod === '404') {
            return res.status(404).json({
                success: false,
                msg: json.message,
            });
        } else {
            const now = Date.now();

            // let record = await sequelize.query(`SELECT * FROM weather WHERE zip = ${req.params.zip}`);
            let record = await weather.findOne({
                where: {
                    zip: req.params.zip,
                },
            });

            if (!record) {
                // record = await sequelize.query(`INSERT INTO weather (city, zip, temperature_f, pressure, humidity, created_at, updated_at) VALUES (${json.name}, ${req.params.zip}, ${json.main.temp}, ${json.main.pressure}, ${json.main.humidity}, NOW(), NOW());`);
                record = await weather.create({
                    city: json.name,
                    zip: req.params.zip,
                    temperature_f: json.main.temp,
                    pressure: json.main.pressure,
                    humidity: json.main.humidity,
                    created_at: now,
                    updated_at: now,
                });

                req.weather = record;
            } else {
                // record = await sequelize.query(`UPDATE weather SET city=${json.name}, temperature_f=${json.main.temp}, pressure=${json.main.pressure}, humidity=${json.main.humidity}, updated_at=NOW();`);
                record = await weather.update(
                    {
                        city: json.name,
                        temperature_f: json.main.temp,
                        pressure: json.main.pressure,
                        humidity: json.main.humidity,
                        updated_at: now,
                    },
                    {
                        where: {
                            zip: req.params.zip,
                        },
                    }
                );

                // record = await sequelize.query(`SELECT * FROM weather WHERE zip = ${req.params.zip}`);
                record = await weather.findOne({
                    where: { zip: req.params.zip },
                });
                req.weather = record;
            }
        }

        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: 'Server Error!',
        });
    }
};
