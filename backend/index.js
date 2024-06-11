const express = require('express');

const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');

const postsRoutes = require('./routes/posts');

const errorController = require('./controllers/error');

const app = express();

const cors = require('cors'); 

app.use(bodyParser.json());

app.use(cors());

const frontendPath = path.join(__dirname, '../frontend/dist/posts');
app.use(express.static(frontendPath));

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

const PORT = process.env.PORT || 8080;

app.listen(process.env.PORT, (err) => {
    if (err) {
      console.error('Error starting server:', err);
    } else {
        console.log(`Server is running on port ${PORT}`);
      }
    });
