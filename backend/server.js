// import thư viện express
var express = require('express');
var app = express();
// khai báo cổng chạy dịch vụ
var PORT = process.env.PORT || 3000;

// "To do API Root" sẽ được trả về khi thực hiện get request trên trang home page của ứng dụng  
 app.get('/', function(req, res) {
  res.send('To do API Root')
 });

app.listen(PORT, function() {
  console.log('Express listening on port' + PORT + '!');
});
var todos =[{
  id: 1,
  description: 'Build a simple API - nodejs',
  completed: false
 }, {
  id: 2,
  description: 'Go to T-beer - team building',
  completed: false
 }, {
  id: 3,
  description: 'Feed the dog ',
  completed: true
 }];
// GET /todos
app.get('/todos', function(req, res) {
  res.json(todos);
 });
 app.get('/todos/:id', function(req, res) {
  // params được gửi thuộc kiểu string do đó phải convert params về kiểu integer 
  var todoId = parseInt(req.params.id, 10);
  var matchedTodo;
  // duyệt từng phần tử trong todos
  todos.forEach(function (todo) {
    if (todoId == todo.id) {
      matchedTodo = todo;
    }
  });
  // nếu tồn tại kết quả thì trả về dưới dạng json nếu không trả về status 404
  if (matchedTodo) {
    res.json(matchedTodo);
  } else {
    res.status(404).send();
  }
});
var bodyParser = require('body-parser');

var todoNextId = 4;

app.use(bodyParser.json())
app.post('/todos', function(req, res) {
  var body = req.body;

  body.id = todoNextId++;

  todos.push(body);

  res.json(body);
});
var _ = require('underscore');

// refactor find object in todos 
app.get('/todos/:id', function(req, res) {
  var todoId = parseInt(req.params.id, 10);
 var matchedTodo = _.findWhere(todos, {id: todoId});
 
});

// validate and permit params when create new object
app.post('/todos', function(req, res) {
  var body = _.pick(req.body, 'description', 'completed');   //never trust parameters from the scary internet

  if (!_.isBoolean(body.completed) || !_.isString(body.description) ||
    body.description.trim().length == 0) {
    return res.status(400).send();
  }
  
});
app.delete('/todos/:id', function(req, res) {
  var todoId = parseInt(req.params.id, 10);
  var matchedTodo = _.findWhere(todos, {id: todoId});

  if(!matchedTodo) {
    res.status(404).json({"error": "no todo found with that id"});
  } else {
    todos = _.without(todos, matchedTodo);
    res.json(matchedTodo);
  }
});