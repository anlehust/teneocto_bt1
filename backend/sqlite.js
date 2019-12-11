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
let db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error(err.message);
  }
});
var todos = [];
var i = 0;
var i1 = 0;
db.serialize(() => {
  // db.run('CREATE TABLE products(ProductCode text, ProductName text, ProviderName text, Price text, Quantity text, TypeOfProduct text)') /*});*/

  //   .run(`INSERT INTO products(ProductCode, ProductName , ProviderName , Price , Quantity, TypeOfProduct)
  //           VALUES('P01','Laptop','HP','1000','100','01'),
  //           ('P02','IPhone','SS','2000','100','03'),
  //           ('P03','Laptop','HP','1000','100','01')`)
  db.each(`SELECT * FROM products ORDER BY ProductCode ASC`, (err, row) => {
    if (err) {
      throw err;
    }


    todos[i] = JSON.stringify(row);
    console.log(todos[i]);
    i++;
    // while(i1!=0){
    //   todos.pop();
    //   i1--;
    // }

  })


});




db.serialize();
GetProduct = function () {
  return new Promise((resolve, reject) => {
    i = 0;
    todos=[];
    db.each(`SELECT * FROM products ORDER BY ProductCode ASC`, (err, row) => {
      if (err) {
        reject(err);
      }
      todos[i] = JSON.stringify(row);
      i++;
    }, (err, count) => {
      resolve(todos);
    });
  })
}
app.get('/todos', function (req, res) {
  GetProduct().then(() => {
    res.send(todos);
  });
});

app.post('/todos', function (req, res) {
  // todos[i] = JSON.stringify(req.body);
  // console.log(todos[i]);
  // console.log(i);
  // i++;
  db.run(`INSERT INTO products(ProductCode, ProductName , ProviderName , Price , Quantity, TypeOfProduct)` +
    `VALUES('` + req.body.ProductCode + `','` + req.body.ProductName + `','` + req.body.ProviderName + `','` + req.body.Price + `','` + req.body.Quantity + `','` + req.body.TypeOfProduct + `')`, (result, err) => {
      res.status(200).json('success');
    })


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
Delete = function(ProductCodes){
  return new Promise((resolve, reject) => {
    let isDone = 1;
    console.log(ProductCodes.length );
    (ProductCodes).forEach(element => {
      let sql = `DELETE  FROM products WHERE ProductCode='` + element + `'`;
      console.log(sql);
      
      db.run(sql, (err) => {
        if (err) reject(err);
        
          if (isDone==ProductCodes.length) resolve('done');
          else isDone ++;
      })
      // i1++;
    })
     
    ;
//     i = 0;
//     todos=[];
//     db.each(`SELECT * FROM products ORDER BY ProductCode ASC`, (err, row) => {
//       if (err) {
//         reject(err);
//       }
//       todos[i] = JSON.stringify(row);
//       i++;
//     }, (err, count) => {
//       resolve(todos);
// })
})}
app.delete('/todos', function (req, res) {
 
Delete(req.body).then(()=>{res.status(200).json({
  Success: true
   // console.log(req.body);
  // (req.body).forEach(element => {
  //   let sql = `DELETE  FROM products WHERE ProductCode='` + element + `'`;
  //   console.log(sql);

  //   db.run(sql, (err) => {
  //     if (err) throw err;
  //   })
  //   i1++;
  // });
});})
  


})
GetProductByProperties= function(props){
  return new Promise((resolve, reject) => {
     todos =[];
     i=0;
    let sql = `SELECT * FROM products WHERE ProductCode like "%` + props.productcode + `%"`
    +`AND ProductName like"%`+props.productname+`%"`
    +`AND ProviderName like"%`+props.providername+`%"`
    +`AND Price like"%`+props.price+`%"`
    +`AND Quantity like"%`+props.quantity+`%"`
    +`AND TypeOfProduct like"%`+props.typeofproduct+`%"`;
    db.each(sql, (err, data) => {
      if (err) {
        reject(err);
      }
      todos[i]=JSON.stringify(data);
      i++;
    },(err, count) => {
      resolve(todos);
    });
    })}
    app.get('/todos/:id', function (req, res) {
      let sql = `SELECT * FROM products WHERE ProductCode= "` + req.params.id + `"`;
      db.each(sql, (err, data) => {
        res.send(JSON.stringify(data));
      });
    })
    app.get('/todosbyprop/:props',function(req,res){
        var prop = JSON.parse(req.params.props);
        GetProductByProperties(prop).then(() => {
          res.send(todos);
        });
    })





    let db1 = new sqlite3.Database('./databasebaocao.sqlite', (err) => {
      if (err) {
        console.error(err.message);
      }
    });
    var record = [];
var i_rc;

db1.serialize(() => { 
    db1.each(`SELECT * FROM record ORDER BY Month ASC`, (err, row) => {
    if (err) {
      throw err;
    }
    record[i_rc] = JSON.stringify(row);
    console.log(record[i_rc]);
    i_rc++;
  })
});
db1.serialize();
// db.serialize();
GetData = function () {
    return new Promise((resolve, reject) => {
      i_rc = 0;
      record=[];
      db1.each(`SELECT * FROM record ORDER BY Month ASC`, (err, row) => {
        if (err) {
          reject(err);
        }
        record[i_rc] = JSON.stringify(row);
        i_rc++;
      }, (err, count) => {
        resolve(record);
      });
    })
  }
  app.get('/record', function (req, res) {
    GetData().then(() => {
      res.send(record);
    });
  });
  app.post('/record', function (req, res) {
      console.log(req.body.QuantitySold);
    db1.run(`INSERT INTO record(Month, TypeOfProduct, QuantitySold)` +
      `VALUES('` + req.body.Month + `','` + req.body.TypeOfProduct +`',`+req.body.QuantitySold+ `)`, (result, err) => {
        console.log(result);
        //console.log(err);
        if(result.code='SQLITE_CONSTRAINT') res.status(200).json('error');
         else res.status(200).json('success');
        
      })
  
  
  });
  GetRecordByProperties= function(props){
    return new Promise((resolve, reject) => {
       record =[];
       i_rc=0;
      let sql = `SELECT * FROM record WHERE Month like "%` + props.Month + `%"`
      +`AND TypeOfProduct like"%`+props.TypeOfProduct+`%"`
      +`AND QuantitySold like"%`+props.QuantitySold+`%"`
      +`ORDER BY TypeOfProduct ASC`
      
      db1.each(sql, (err, data) => {
        if (err) {
          reject(err);
        }
        record[i_rc]=JSON.stringify(data);
        i_rc++;
      },(err, count) => {
        resolve(record);
      });
      })}
      app.get('/recordbyprop/:props',function(req,res){
          var prop = JSON.parse(req.params.props);
          GetRecordByProperties(prop).then(() => {
            res.send(record);
          });
      })