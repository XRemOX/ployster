const express = require('express')
const app = express()
const port = 3000

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./server/ployster.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the Ployster database.');
});

// WEB
app.use(express.static('web/public', { index: "login.html" }))

// API
app.post("/api/register", function(req, res) {
  console.log(req.body);
});

app.listen(port, () => console.log(`Ployster is running on port ${port}!`));

db.close();
