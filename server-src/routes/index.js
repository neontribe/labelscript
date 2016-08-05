var express = require('express');
var router = express.Router();
var printroute = require('./print.js');
router.use('/print',printroute);

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
