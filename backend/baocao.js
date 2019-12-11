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
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log('Express listening on port' + PORT + '!');
});
const sqlite3 = require('sqlite3').verbose();

// open the database connection
let db = new sqlite3.Database('./databasebaocao.sqlite', (err) => {
  if (err) {
    console.error(err.message);
  }
});
