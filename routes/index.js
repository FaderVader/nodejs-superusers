var express = require('express');
var router = express.Router();
var config = require('../package.json');


/* GET home page. */
router.get('/', function(req, res, next) {
	// index.html + data	

 let data =  { 
	 title: 	config.name ,
	 version:   config.version ,
	 x      : 'xxyxyyyxx'

}

  res.render('index', data );
});

module.exports = router;
