var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
   	
  	// res.send('respond with a resource');
  	
  	let NAME_Query = req.query.name

  	let data = [{
  		name:  NAME_Query
  	},{
  		name: "x"
  	},{
  		name: "x"
  	}]
  	res.json( data )


});

module.exports = router;
