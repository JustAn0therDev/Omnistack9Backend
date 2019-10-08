const Booking = require('../models/Booking');

module.exports = {
    async store(req, res) {
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            approved: null,
            date
        });
        //Cria um "relacionamento" entre as tabelas sem o uso de Primary ou Foreign keys, populando cada campo com os dados da tabela referenciada.
        await booking.populate('spot').populate('user').execPopulate();

        return res.status(200).json({success: true, message: 'Booking has been successfully created!', booking});
    }
};