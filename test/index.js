const express = require('express')
const app = express()
const port = 3000

app.use(express.static('web/public', { index: "login.html" }))

app.listen(port, () => console.log(`Ployster is running on port ${port}!`))
