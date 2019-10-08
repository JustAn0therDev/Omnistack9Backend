const express = require('express');
const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingsController = require('./controllers/BookingContoller');
const routes = express.Router();
const multer = require('multer');
const uploadConfig = require('./config/upload');

const upload = multer(uploadConfig);

routes.get('/', function (request, response) {
    response.status(200)
    .send('Pagina default');
});

//Sessions
routes.post('/sessions', SessionController.store);  

//Spots
routes.post('/spots', upload.single('thumbnail'),SpotController.store);
routes.get('/spots', SpotController.index);
routes.post('/spots/delete', SpotController.destroy);
routes.post('/spots/:id/bookings', BookingsController.store);

//Dashboard
routes.get('/dashboard', DashboardController.show);


module.exports = routes;