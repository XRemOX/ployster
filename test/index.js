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
  db.run("INSERT INTO users(firstname, lastname, email, password) VALUES(?, ?, ?, ?)",
         [req.body.firstname, req.body.lastname, req.body.email, req.body.password],
         (err) => {
    if (err) {
      res.redirect('/error.html');
    } else {
      res.redirect('/login.html');
    }
  });
});

app.post("/api/login", function(req, res) {
  db.get("SELECT id FROM users WHERE email=? AND password=?",
         [req.body.email, req.body.password],
         (err, row) => {
     if (err || !row) {
       res.redirect('/error.html');
     } else {
       res.redirect('/index.html');
     }
   });
});

app.listen(port, () => console.log(`Ployster is running on port ${port}!`));
