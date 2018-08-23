var express = require('express');
var router = express.Router();

const buController = require('../controllers/buController');


/* GET users listing. */
router.get('/list/bu', buController.getBUs);
router.post('add/bu', buController.addBU);
  
module.exports = router;