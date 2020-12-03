const router = require('express').Router();
const { updateWeather } = require('../middleware/fetchWeather');
const { getWeather } = require('../controllers/weather');

router.route('/:zip').get(updateWeather, getWeather);

module.exports = router;
