const Spot = require('../models/Spot');

module.exports = {
    async index(req, res) {
        const { tech } = req.query;

        const spots = await Spot.find({ technologies: tech });

        return res.json(spots);
    },
    async store(req, res) {
        const { filename } = req.file;
        const { company, technologies, price } = req.body;
        const { user_id } = req.headers;

        if(!user_id) return res.status(401).json({success: false, error: 'A user must be logged in to create a spot.'});

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            technologies: technologies.split(',').map(tech => tech.trim()), 
            price
        });

        return res.json({spot});
    },
    async destroy(req, res) {
        const { spot_id } = req.body;
        const { user_id } = req.headers;

        if(!user_id) return res.status(401).json({success: false, error: 'A user must be logged in to delete a spot.'});

        if(!spot_id) return res.status(404).json({success: false, message: 'Spot not found.'});

        const spot = await Spot.findByIdAndDelete(spot_id);

        return res.status(200).json({success: true, message: "Spot successfully deleted.", spot});
    }
}