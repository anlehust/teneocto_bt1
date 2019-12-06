// import thư viện express
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var _ = require('underscore');
app.use(cors());
app.use(bodyParser({
  limit: '50mb'
}));
// khai báo cổng chạy dịch vụ
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Express listening on port' + PORT + '!');
});
const sqlite3 = require('sqlite3').verbose();
// class Product {
//   constructor(productcode, productname, providername, price, quantity, type) {
//      this.productcode= productcode;
//      this.productname=productname;
//      this,providername=providername;
//      this.price=price;
//      this.quantity=quantity;
//      this.type=type;
//   }
// }
// open the database connection
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error(err.message);
  }
});
var todos = [];
var i = 0;
db.serialize(() => {
  db.run('CREATE TABLE products(ProductCode text, ProductName text, ProviderName text, Price text, Quantity text, TypeOfProduct text)') /*});*/

    .run(`INSERT INTO products(ProductCode, ProductName , ProviderName , Price , Quantity, TypeOfProduct)
            VALUES('P01','Laptop','HP','1000','100','01'),
            ('P02','IPhone','SS','2000','100','03'),
            ('P03','Laptop','HP','1000','100','01')`)
    .each(`SELECT * FROM products`, (err, row) => {
      if (err) {
        throw err;
      }


      todos[i] = JSON.stringify(row);
      console.log(todos[i]);

      i++;

      // todos[i].productcode=(todos[i].productcode).concat(row.productcode);
      // i++;


    });

});

db.serialize();

app.get('/todos', function (req, res) {
  res.send(todos);
});

app.post('/todos', function (req, res) {
  todos[i] = JSON.stringify(req.body);
  console.log(todos[i]);
  console.log(i);
  i++;
  res.status(200).json('success');
});
app.put('/todos/:id', function (req, res) {
  // console.log(req);
  // console.log(typeof(req.body.ProductName));
  let data = [req.body.ProductName, req.body.ProviderName, req.body.Price, req.body.Quantity, req.body.TypeOfProduc, req.body.ProductCode];
  let sql = `UPDATE products ` +
    `SET ProductName ='` + req.body.ProductName + `'` +
    `, ProviderName ='` + req.body.ProviderName + `'` +
    `, Price ='` + req.body.Price + `'` +
    `, Quantity ='` + req.body.Quantity + `'` +
    `, TypeOfProduct ='` + req.body.TypeOfProduct + `'` +
    ` WHERE ProductCode='` + req.body.ProductCode + `'`;
  // let sql = `UPDATE products 
  // SET ProductName = ?
  // , ProviderName =?
  // , Price =?
  // , Quantity =?
  // , TypeOfProduct =?
  //  WHERE ProductCode=?`;
  // let sql= ` UPDATE products
  // SET ProductCode = 3 
  // WHERE StudentId = 6;`
  db.run(sql, (result, err) => {
    i = 0;
    db.each(`SELECT * FROM products`, (err, row) => {
      if (err) {
        throw err;
      }


      todos[i] = JSON.stringify(row);
      i++;
    });
    res.status(200).json({
      Success: true
    });
  });
  // db.run(sql,data, function(err){
  //   console.log('done');
  //   if (err) {
  //     return console.error(err.message);
  //   }
  //   console.log(sql);
  // });

})
app.delete('/todos', function (req, res) {

  if (1) {
    (req.body).forEach(element => {
      let sql = `DELETE  FROM products WHERE ProductCode='` + element + `'`;
      console.log(sql);
      db.run(sql, (err) => {
        if (err) throw err;
      })
    });


    db.each(`SELECT * FROM products`, (err, row) => {
      if (err) {
        throw err;
      }

      todos[i] = JSON.stringify(row);
      i++;
      console.log(i);
    });

    res.status(200).json({
      Success: true
    });
  };

})
// app.delete('/todos/:id', function (req, res) {
//   var todoId = parseInt(req.params.id, 10);
//   var matchedTodo = _.findWhere(todos, {
//     id: todoId
//   });

//   if (!matchedTodo) {
//     res.status(404).json({
//       "error": "no todo found with that id"
//     });
//   } else {
//     todos = _.without(todos, matchedTodo);
//     res.json(matchedTodo);
//   }
//   let delRef = db.collection('user_list').doc(todoId.toString()).delete();
//   console.log('Delete Done');
// });
app.get('/todos/:id', function (req, res) {
  let sql = `SELECT * FROM products WHERE ProductCode= "` + req.params.id + `"`;
  db.each(sql, (err, data) => {
    res.send(JSON.stringify(data));
  });
})
// app.get('/todos',function(req,res){
// var todos=[];
// var i=0;
// db.each(`SELECT message FROM greetings`, (err, row) => {
//     if (err){
//       throw err;
//     }
//     console.log(row.message);
//     todos[i]=row.message;
//     console.log ('todos'+i+todos[i]);
//     i++;
//   });
// });
// app.post('/todos',function(){
// db.run(`INSERT INTO greetings(message)
//           VALUES('Hi'),
//                 ('Hello'),
//                 ('Welcome')`)});