var express = require('express');
var utility = require('../controller/utlity')
var router = express.Router();
var multer  = require('multer')

var storage = multer.diskStorage({
  destination: (req, file, cb) => {

    cb(null, 'public/files/')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now()+'.csv')
  }
});

var upload = multer({storage: storage});

/* GET home page. */
router.post('/upload',upload.single('files'), utility.fileUpload);
router.get('/csv/:count', utility.generateCsv);


module.exports = router;




