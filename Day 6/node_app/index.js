const express = require('express')
var routes = require('./routes/using_router');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use('/user',routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});