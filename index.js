const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes');
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://admin:admin@cluster0-shard-00-00-l0cdv.mongodb.net:27017,cluster0-shard-00-01-l0cdv.mongodb.net:27017,cluster0-shard-00-02-l0cdv.mongodb.net:27017/minimarket?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology: true},
(err) => {
    if (err) console.log(err);
    else console.log('CONNECT MONGO ATLAS');
});

app.use('/image', express.static('image'));
app.use(require('cors')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
// app.use('/', require('./routes/products/index'));
// app.use('/', require('./routes/users/index'));
Object.keys(routes).forEach((key) => {
    app.use('/', routes[key]);
  });
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        title: 'ERROR',
        msg: err.message,
        stack: err.stack
    });
})
app.listen(PORT, () => console.log(`SERVER CONNECTED ON PORT ${PORT}`));