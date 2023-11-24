const express = require('express');
const routes = require('./routes');

const app = express();
const port = 5000;

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log('server running on port 5000');
});
