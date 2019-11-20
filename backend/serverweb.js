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
   //.doc('users');
  // let docRef = db.doc('users');
  let docRef = db.collection('user_list');
  // console.log(data);
  console.log('Push Done');
  docRef.doc(data.id.toString()).set(data);
};

// docRef.doc(id.toString()).get()

// let setAda = docRef.set({
//   id: 1,
//   description: 'Build a simple API - nodejs',
//   completed: false,
//   name:'AN'
// });
//
var Node = new Node();
var BST = new BinarySearchTree();




var todos =[
];
async function getMarker() {
  const snapshot = await db.collection('user_list').get()
  var i=0;
  snapshot.forEach(doc => {
    // chèn doc.data() vào todos
    todos[i]=doc.data();
    i++;
  });



}
//    function getDataFromFirebase(){
//   let docRef=db.collection('user_list').doc('1');
// let getDoc = docRef.get()
// .then(doc => {
//   if (!doc.exists) {
//     console.log('No such document!');
//   } else {
//     todos[0]=doc.data();
//     console.log('Get Done');
//   }
// })
// .catch(err => {
//   console.log('Error getting document', err);
// });
//  }
// getDataFromFirebase();

// "To do API Root" sẽ được trả về khi thực hiện get request trên trang home page của ứng dụng  
 app.get('/', function(req, res) {
  res.send('...');
 });

app.listen(PORT, function() {
  console.log('Express listening on port' + PORT + '!');
});

 app.get('/todos',function(req,res){
  getMarker();
  todos.forEach(element => {
    fs.readFile(element.imgsrc, (err, data) => {
            if (err) throw err;
            //parse nghĩa là parse dữ liệu text của chúng ta từ dạng string quay về dạng object
          let string = toString(data);
            element.imgsrc= string ;
        })
  });
  // after get img path
  // read base64 from img path
  // return data/
  
//   fs.access('mynewfile3.json', fs.F_OK, (err) => {
//     if (!err) {
//     fs.readFile('mynewfile3.json', (err, data) => {
//       if (err) throw err;
//       //parse nghĩa là parse dữ liệu text của chúng ta từ dạng string quay về dạng object
//       let jsonObject = JSON.parse(data);
//       console.log (jsonObject);
//   })
// }})

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
  // get image base64 from body. 
        fs.writeFile('H:/workplace/bt1/backend/image/img'+body.id+'.json', JSON.stringify(body.imgsrc), function (err) {
          if (err) throw err;
          console.log('Saved!');})
       
    
  // save image base64 to file.
  // push img path to firebase
  body.imgsrc='H:/workplace/bt1/backend/image/img'+body.id+'.json';
  pushUserToFirebase(body);
  // fs.access('mynewfile3.json', fs.F_OK, (err) => {
  //   if (err) {
  //     fs.writeFile('mynewfile3.json', JSON.stringify(body), function (err) {
  //       if (err) throw err;
  //       console.log('Saved!');
  //     });
  //   }
  
  //   fs.appendFile('mynewfile3.json', JSON.stringify(body), function (err) {
  //     if (err) throw err;
  //     console.log('Saved!');
  //   });
  // })
  
  // todos.push(body);
  // res.json('Added user');

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
//  app.post('/todos', function(req, res) {
//   var body = req.body; //never trust parameters from the scary internet
//   if (body === null) {
//     return;
//   }
//   let setDoc = docRef.set(JSON.stringify(body));
  
//   todos.push(body);
//   res.json('Added user');
// });
// });
// GET /todos
// app.get('/todos', function(req, res) {
//   var queryParams = req.query;
//   var filteredTodos = todos;
//   if (queryParams.hasOwnProperty('search') && queryParams.search.length > 0) {
//     filteredTodos = _.filter(filteredTodos, function(item) {
//       return item.description.indexOf(queryParams.search) > -1
//     });
//   } else if (queryParams.hasOwnProperty('completed') && queryParams.completed == 'true') {
//     filteredTodos = _.where(filteredTodos, {
//       completed: true
//     });
//   } else if (queryParams.hasOwnProperty('completed') && queryParams.completed == 'false') {
//     filteredTodos = _.where(filteredTodos, {
//       completed: false
//     });
//   }
//   res.json(filteredTodos);
//  });
 
//  app.get('/todos/:id', function(req, res) {
//   // params được gửi thuộc kiểu string do đó phải convert params về kiểu integer 
//   var todoId = parseInt(req.params.id, 10);
//   var matchedTodo = _.findWhere(todos, {id: todoId});
  
//   if (matchedTodo) {
//     res.json(matchedTodo);
//   } else {
//     res.status(404).send();
//   }
// });


// // PUT /todos/:id
// app.put('/todos/:id', function(req, res) {
//   var body = _.pick(req.body, 'description','completed','name');
//   var validAttributes = {}

//   var todoId = parseInt(req.params.id, 10);
//   var matchedTodo = _.findWhere(todos, {id: todoId});

//   if (!matchedTodo) {
//     return res.status(404).json();
//   }

//   if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
//     validAttributes.completed = body.completed;
//   } else if (body.hasOwnProperty('completed')){
//     return res.status(404).json();
//   }

//   if (body.hasOwnProperty('description') && _.isString(body.description) &&
//     body.description.trim().length > 0) {
//     validAttributes.description = body.description;
//   } else if (body.hasOwnProperty('description')) {
//     return res.status(404).json();
//   }
//   if (body.hasOwnProperty('name') && _.isString(body.name) &&
//     body.name.trim().length > 0) {
//     validAttributes.name = body.name;
//   } else if (body.hasOwnProperty('name')) {
//     return res.status(404).json();
//   }

//   _.extend(matchedTodo, validAttributes);
//   res.json(matchedTodo);

// });
