const express = require('express')
var userRoutes = require('./routes/user');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use('/user',userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});