var express = require('express');
var router = express.Router();

const buController = require('../controllers/buController');
const userController = require('../controllers/userController');
const vehicleController = require('../controllers/vehicleController');
const orderController = require('../controllers/orderController');


/* User */
router.get('/list/user', userController.getUsers);
router.post('/add/user', userController.addUser);
router.get('/get/user', userController.getUser);
router.post('/user/login', userController.login)




/* BU */
router.get('/list/bu', buController.getBUs);
router.post('add/bu', buController.addBU);

/* Vehicle */
router.get('/list/vehicle', vehicleController.getVehicles);
router.post('/add/vehicle', vehicleController.addVehicle);


/* Order */
router.get('/list/order', orderController.getOrders);
router.post('/add/order', orderController.newOrder);
  
module.exports = router;