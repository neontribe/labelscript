var express = require('express');
var router = express.Router();

/* our printer code */
var printer = require('../printer.js').printer;

/* GET home page. */
router.get('/', function(req, res) {
    res.render('status', { title: 'Express', printer: {
        status: printer.getStatus()
    }});
});

module.exports = router;
