var app 							= require('express')()
var config 							= require('../package.json')
var SqlServer_integration       	= require('../Jalal/SqlServer_integration')

// this is the magic behind the scene
// code injection 
app.use( (req, res, next) => {
    req.sqlserver = SqlServer_integration( config.sqlserver )
    next()
})

// code injection 
// logging
app.use( (req,res,next) => {
	
	console.log(new Date() , req.method , req.url )
	next()
})




app.get('/product',  (req, res) => {

	let count = req.query.count || 10 

	let query1 =  
			`SELECT TOP ${count} pc.Name as Kategori, p.name as Produkt 
            FROM [SalesLT].[ProductCategory] pc 
            JOIN [SalesLT].[Product] p 
            ON pc.productcategoryid = p.productcategoryid
            For JSON PATH
		    `
    req.sqlserver( query1 ).output( res )

})



app.get('/databases',  (req, res) => {

	
	let query1 =  
			`
				SELECT name as [databaseName] FROM sys.databases
				For JSON PATH	
		    `
    req.sqlserver( query1 ).output( res )

})


 // The magical one line of code of Node :-)

require('http')
	.createServer(app)
		.listen(config.port, 
		() => console.log(` 
				
				The magic happens at port ${config.port} 

				http localhost:${config.port}/product?count=20

				http localhost:${config.port}/databases

				
				`))

