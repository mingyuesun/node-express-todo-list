var express = require('express')
var todoController = require('./controllers/todoController')

var app = express()

app.set('view engine', 'ejs')

app.use(express.static('./public'))

todoController(app)

app.listen(3300)
console.log('You are listening prot 3300')