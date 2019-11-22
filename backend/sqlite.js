// import thư viện express
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var _ = require('underscore');
app.use(cors());
app.use(bodyParser({limit: '50mb'}));
// khai báo cổng chạy dịch vụ
var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log('Express listening on port' + PORT + '!');
  });
const sqlite3 = require('sqlite3').verbose();
 
// open the database connection
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error(err.message);
  }
});
 
db.serialize(() => {
  // Queries scheduled here will be serialized.
  db.run('CREATE TABLE products(productcode text, productname text, providername text, price real, quantity integer, type text)')
  .run(`INSERT INTO products(productcode)
          VALUES('Hi'),
                ('Hello'),
                ('Welcome')`)
                .each(`SELECT productcode FROM products`, (err, row) => {
                  if (err){
                    throw err;
                  }
                  console.log(row.productdoce);})
    
});
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