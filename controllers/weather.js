// @desc    Get the Weather of a Specific Area
// @route   GET /api/v1/weather/:zip
// @access Public
exports.getWeather = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            data: { ...req.weather.dataValues },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: 'Server Error!',
        });
    }
};
