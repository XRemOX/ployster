const express = require('express')
const app = express()
const port = 3000

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// WEB
app.use(express.static('web/public', { index: "login.html" }))

// API
app.post("/api/register", function(req, res) {
  console.log(req.body);
});

app.listen(port, () => console.log(`Ployster is running on port ${port}!`))
