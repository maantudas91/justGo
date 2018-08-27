var express = require('express');
var router = express.Router();

const buController = require('../controllers/buController');
const userController = require('../controllers/userController');
const vehicleController = require('../controllers/vehicleController');
const orderController = require('../controllers/orderController');

//const authenticate  = require('../middleware/authenticate');


/**********Admin APIs******** */


/* User */
router.get('/list/user', userController.getUsers);
router.post('/add/user', userController.addUser);
router.get('/get/user', userController.getUser);




/* BU */
router.get('/list/bu', buController.getBUs);
router.post('/add/bu', buController.addBU);

/* Vehicle */
router.get('/list/vehicle', vehicleController.getVehicles);
router.post('/add/vehicle', vehicleController.addVehicle);


/* Order */
router.get('/list/order', orderController.getOrders);
router.post('/add/order', orderController.newOrder);





/******************User APIs************************* */

router.post('/user/signup', userController.signup);
router.post('/user/login', userController.login);
router.get('/user/check', userController.authenticate, userController.userCheck);
  
module.exports = router;
