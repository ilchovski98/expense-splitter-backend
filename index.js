const express = require('express');
require('dotenv').config();

const app = express();
const port  = process.env.PORT || 8000;

require('./startup/config')();
require('./startup/db')();
require('./startup/prod')(app);
require('./startup/routes')(app);

app.listen(port, () => {
  console.log('Our app is running on port ', port);
})
