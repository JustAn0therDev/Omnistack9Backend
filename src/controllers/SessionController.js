//index, show, store, update, destroy - Métodos no objeto que deve existir para todo controller.
const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const { email } = req.body;
        if (!email) return res.status(400).json('You must send an e-mail to be registered in our database!');

        const user = await User.findOne({email});

        if (!user) {
            User.create({ email });
            return res.status(200).json(user);
        } 
        
        return res.status(200).json(user);
    }
}