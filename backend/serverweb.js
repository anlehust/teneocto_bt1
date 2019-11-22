// import thư viện express
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var _ = require('underscore');
var fs = require('fs');
var { Node, BinarySearchTree } = require ('H:/workplace/bt1/backend/BST.js');
var todoNextId = 4;
app.use(cors());
app.use(bodyParser({limit: '50mb'}));
// khai báo cổng chạy dịch vụ
var PORT = process.env.PORT || 3000;

const admin = require('firebase-admin');

let serviceAccount = require('C:/Users/teneocto/Downloads/bt1-firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

function pushUserToFirebase(data) {
  let docRef = db.collection('user_list');
  console.log('Push Done');
  console.log(data);
  docRef.doc(data.ProductCode.toString()).set(data);
};


var Node = new Node();
var BST = new BinarySearchTree();




var todos =[
];
async function getMarker() {
  const snapshot = await db.collection('user_list').get()
  var i=0;
  snapshot.forEach(doc => {
    todos[i]=doc.data();
    i++;
  });



}


// "To do API Root" sẽ được trả về khi thực hiện get request trên trang home page của ứng dụng  
 app.get('/', function(req, res) {
  res.send('...');
 });

app.listen(PORT, function() {
  console.log('Express listening on port' + PORT + '!');
});

 app.get('/todos',function(req,res){
  getMarker();
  res.send(todos);
 });

 app.get('/todos/:id',function(req,res){
   var todoID= parseInt(req.params.id,10);
   var matchedTodo=_.findWhere(todos,{id:todoID});
   if (matchedTodo) {
        res.json(matchedTodo);
      } else {
        res.status(404).send();
      }
 })
 app.post('/todos', function(req, res) {
  var body = req.body; //never trust parameters from the scary internet
  if (body === null) {
    return;
  }
 
  pushUserToFirebase(body);
});
//PUT /todos/:id
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
  let delRef=db.collection('user_list').doc(todoId.toString()).set(matchedTodo);
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
  let delRef=db.collection('user_list').doc(todoId.toString()).delete();
  console.log('Delete Done');
});
