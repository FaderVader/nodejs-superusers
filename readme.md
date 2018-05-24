## Nodejs Kursus


## Clone the project

```
git clone https://git.itacademy.dk/kursus/nodejs-kursus.git appName

cd appName

git checkout dev-middelware

npm run  

```

### How to get latest version from git

```
git pull 

```



### About npm-cli 

http://about_node.itacademy.dk/npm-cli/



### How to create package.json 

```
npm init --yes

```


### How to deploy to remote git repo 

```
npm run deploy
```


### How to create .gitignore using npx

npx goops

 

### What to do ? 

* REST API Service using Express
	* http://localhost:1234/data

* SQLServer remote connection 

	* SQL --> JSON 
	* server 	= jalal-cloud.database.windows.net
	* database  = jalaldb
	* user      = jalal
	* pwd       = Djakp88t



## node version on raspberryPI
default 4.8 (legacy version)

## How to upgrade to latest version  

```
sudo curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

source ~/.bashrc

nvm list-remote

nvm install 9.11.1
nvm install 10.1.0

nvm use 9.11.1
nvm use 10.1.0

nvm exec 9.11.1 app.js
nvm exec 10.1.0 app.js

```	



## Express-generator

```
npm i -g express-generator

express .\nodejsAPP\ --force --view=hbs

```


### Integration between SQLSERVER and Express

using middleware code-injection

```

/* GET product by id. */
router.get('/:id', function (req, res) {
    
req.sqlserver("select count(*) from Product where categoryID = @id for json path, without_array_wrapper")
    .param('id',    req.params.id,      TYPES.Int)
    .output(res, '{}')
 
})


/* PUT update product. */
router.put('/:id', function (req, res) {
    
req.sqlserver("exec updateProduct @id, @product")
    fail(function(ex, res) { 
        res.statusCode = 500   
        res.write(ex.message)
        res.end()
    } )
    .param('id',        req.params.id,  TYPES.Int)
    .param('product',   req.body,       TYPES.NVarChar)
    .exec(res)
 
})

```
