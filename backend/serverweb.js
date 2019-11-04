// import thư viện express
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var _ = require('underscore');
var fs = require('fs');
var todoNextId = 4;
app.use(cors());
app.use(bodyParser({limit: '50mb'}));
// khai báo cổng chạy dịch vụ
var PORT = process.env.PORT || 3000;

// "To do API Root" sẽ được trả về khi thực hiện get request trên trang home page của ứng dụng  
 app.get('/', function(req, res) {
  res.send('To do API Root')
 });

app.listen(PORT, function() {
  console.log('Express listening on port' + PORT + '!');
});
var todos =[
//   {
//   id: 1,
//   description: 'Build a simple API - nodejs',
//   completed: false,
//   name:'AN'
//  }, {
//   id: 2,
//   description: 'Go to T-beer - team building',
//   completed: false,
//   name:'AN'
//  }, {
//   id: 3,
//   description: 'Feed the dog ',
//   completed: true,
//   name:'AN'
//  }
];
 
// GET /todos
app.get('/todos', function(req, res) {
  var queryParams = req.query;
  var filteredTodos = todos;
  if (queryParams.hasOwnProperty('search') && queryParams.search.length > 0) {
    filteredTodos = _.filter(filteredTodos, function(item) {
      return item.description.indexOf(queryParams.search) > -1
    });
  } else if (queryParams.hasOwnProperty('completed') && queryParams.completed == 'true') {
    filteredTodos = _.where(filteredTodos, {
      completed: true
    });
  } else if (queryParams.hasOwnProperty('completed') && queryParams.completed == 'false') {
    filteredTodos = _.where(filteredTodos, {
      completed: false
    });
  }
  res.json(filteredTodos);
 });
 
 app.get('/todos/:id', function(req, res) {
  // params được gửi thuộc kiểu string do đó phải convert params về kiểu integer 
  var todoId = parseInt(req.params.id, 10);
  var matchedTodo = _.findWhere(todos, {id: todoId});
  
  if (matchedTodo) {
    res.json(matchedTodo);
  } else {
    res.status(404).send();
  }
});



app.post('/todos', function(req, res) {
  var body = req.body; //never trust parameters from the scary internet
  if (body === null) {
    return;
  }
  fs.access('mynewfile3.json', fs.F_OK, (err) => {
    if (err) {
      fs.writeFile('mynewfile3.json', JSON.stringify(body), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    }
  
    fs.appendFile('mynewfile3.json', JSON.stringify(body), function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  })
  
  todos.push(body);
  res.json('Added user');

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
// PUT /todos/:id
app.put('/todos/:id', function(req, res) {
  var body = _.pick(req.body, 'description','completed','name');
  var validAttributes = {}

  var todoId = parseInt(req.params.id, 10);
  var matchedTodo = _.findWhere(todos, {id: todoId});

  if (!matchedTodo) {
    return res.status(404).json();
  }

  if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
    validAttributes.completed = body.completed;
  } else if (body.hasOwnProperty('completed')){
    return res.status(404).json();
  }

  if (body.hasOwnProperty('description') && _.isString(body.description) &&
    body.description.trim().length > 0) {
    validAttributes.description = body.description;
  } else if (body.hasOwnProperty('description')) {
    return res.status(404).json();
  }
  if (body.hasOwnProperty('name') && _.isString(body.name) &&
    body.name.trim().length > 0) {
    validAttributes.name = body.name;
  } else if (body.hasOwnProperty('name')) {
    return res.status(404).json();
  }

  _.extend(matchedTodo, validAttributes);
  res.json(matchedTodo);

});