var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

/* our printer code */
var printer = require('../printer.js').printer;

router.use(bodyParser.json())

/* GET home page. */
router.get('/', function(req, res) {
    res.render('status', { title: 'Express', printer: {
        status: printer.getStatus()
    }});
});

router.post('/', function(req, res) {
	printer.sendToPrinter(req.body);
	res.close;
});

module.exports = router;
