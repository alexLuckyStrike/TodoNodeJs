const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);


app.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
});
