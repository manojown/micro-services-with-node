var express = require('express');
var utility = require('../controller/utlity')
var router = express.Router();

router.get('/employee', utility.getEmployee);

module.exports = router;




