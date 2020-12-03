import React, { useState } from 'react';

export const WeatherApp = () => {
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [pressure, setPressure] = useState(null);
    const [updated, setUpdated] = useState(null);

    const resetFields = () => {
        setCity(null);
        setTemperature(null);
        setPressure(null);
        setHumidity(null);
        setUpdated(null);
    };

    const getWeather = async () => {
        try {
            let weather = await fetch(`${process.env.API_URL}/${zip}`);
            weather = await weather.json();
            if (weather.success) {
                setCity(weather.data.city);
                setTemperature(weather.data.temperature_f);
                setPressure(weather.data.pressure);
                setHumidity(weather.data.humidity);
                setUpdated(weather.data.updated_at);
            } else {
                throw new Error(weather.msg);
            }
        } catch (err) {
            console.log(err);
            alert('Error Getting Weather!');
        }
    };

    return (
        <div>
            <h1>This is the Weather App</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    getWeather();
                }}
            >
                <input
                    id='zip'
                    type='number'
                    value={zip}
                    onChange={(e) => {
                        resetFields();
                        setZip(e.target.value);
                    }}
                />
                <input id='submit' type='submit' />
            </form>

            <p>City: {city}</p>
            <p>Zip: {city ? zip : null}</p>
            <p>Temperature: {temperature} (F)</p>
            <p>Pressure : {pressure}</p>
            <p>Humidity : {humidity}%</p>
            <p>
                Last Updated :{' '}
                {updated ? new Date(updated).toLocaleString() : null}
            </p>
        </div>
    );
};
