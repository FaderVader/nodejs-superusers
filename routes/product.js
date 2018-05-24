var express   = require('express')
var router    = express.Router()

var config 	                = require('../package.json')
var SqlServer_integration   = require('../Jalal/SqlServer_integration')

router.use( (req, res, next) => {
    
    req.sqlserver = SqlServer_integration( config.sqlserver )

    next()
})


router.get('/', function(req, res, next) {
  
  let count = req.query.count || 10 

  let query1 =  
      `SELECT 	TOP ${count} 
      			pc.Name as categoryName, 
      			p.name as productName 
          
          FROM [SalesLT].[ProductCategory] pc 
            JOIN [SalesLT].[Product] p 
               ON pc.productcategoryid = p.productcategoryid
            	 For JSON PATH
        `
    req.sqlserver( query1 ).output( res )

})

module.exports = router
