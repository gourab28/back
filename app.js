const express = require('express');
const cors = require('cors');
const mainRoutes = require('./routes/mainRoutes');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(mainRoutes);
app.options("*", cors());
app.listen(3000);
console.log('Server is live on port:'+PORT);