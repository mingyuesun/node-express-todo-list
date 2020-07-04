var bodyParser = require("body-parser")

var urlEncodedParser = bodyParser.urlencoded({ extended: false })

var mongoose = require('mongoose')

mongoose.connect('mongodb+srv://admin:admin@cluster0.hc02q.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })

var todoSchema = new mongoose.Schema({
	item: String
})

var Todo = mongoose.model('todo', todoSchema)

// var data = [
//   { item: "get miki" },
//   { item: "walk dog" },
//   { item: "kick dio as ass" },
// ]

module.exports = function (app) {
  app.get("/todo", function (req, res) {
		// res.render("todo", { todos: data })
		Todo.find({}, function(err, data) {
      if (err) throw err
      res.render('todo', { todos: data })
    })
  })

  app.post("/todo", urlEncodedParser, function (req, res) {
    // data.push(req.body)
		// res.json(data)
		Todo(req.body).save(function(err, data) {
      if (err) throw err
      res.json(data)
    })
  })

  app.delete("/todo/:item", function (req, res) {
    // data = data.filter(function (todo) {
    //   return todo.item.replace(/ /g, "-") !== req.params.item
    // })
		// res.json(data)
		Todo.find({item: req.params.item.replace(/-/g, " ")}).remove(function(err, data) {
      if (err) throw err
      res.json(data)
    })
  })
}
