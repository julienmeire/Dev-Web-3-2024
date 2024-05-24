const express = require('express');

const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');

const postsRoutes = require('./routes/posts');

const errorController = require('./controllers/error');

const app = express();

const cors = require('cors'); 

const path = require('path');

app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
    next();
});

app.get('/', (req, res) => {
    res.send('Le serveur fonctionne correctement!');
});

app.use('/auth', authRoutes);

app.use('/post', postsRoutes);

app.use(errorController.get404);

app.use(errorController.get500);

#app.use(express.static(path.join(__dirname, '../frontend/src')))

#app.get('*', (req, res) => {
 # res.sendFile(path.join(__dirname + '/../frontend/src/index.html'))
#})

let port = 8080;
