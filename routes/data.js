var express = require('express');
var router = express.Router();

/* 
    GET http://site:1234/data 

*/
router.get('/', function(req, res, next) {

    //call function name with response as input
    getData(res)
  	
});

var getData = function(res){
  
  var Connection = require('tedious').Connection;
  var Request    = require('tedious').Request;

// Create connection to database
var config = require('../package.json').sqlserver ; 

var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) 
   {
     if (err) 
       {
          console.log(err)
       }
    else
       {
           queryDatabase()
       }
   }
 );

function queryDatabase()
   { console.log('Reading rows from the Table...');

       // Read all rows from table
     request = new Request(
        `   SELECT TOP 20 pc.Name as CategoryName, p.name as ProductName 
            FROM [SalesLT].[ProductCategory] pc 
            JOIN [SalesLT].[Product] p 
            ON pc.productcategoryid = p.productcategoryid
            For JSON PATH 
        `,
             function(err, rowCount, rows) 
                {
                    console.log(rowCount + ' row(s) returned');
                    process.exit();
                }
      );
    
     // runs as a loop many times as row count
     // the magic is to force SQL response to return all rows as one row
     // using For JSON PATH 
     request.on('row', function(columns) {

        // res.write()
        // res.end()

          res.json(JSON.parse( columns[0].value ) )
    
      });

      connection.execSql(request);
     
     }

}


module.exports = router;
