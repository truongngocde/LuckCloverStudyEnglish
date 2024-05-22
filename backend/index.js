const mongoose = require('mongoose');
const dotenv = require('dotenv');

// import third-party
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const https = require('https');

// ============== set port ==============
const app = express();
const normalizePort = (port) => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || '8080');

// ================== config ==================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// import local file
const { MAX } = require('./constant');
const corsConfig = require('./configs/corsConfig');
const wordRouters = require('./routers/wordRouters');
const sentenceRouters = require('./routers/sentenceRouters');
const flashcardRouters = require('./routers/flashcardRouters');
const challengeRoters = require('./routers/challengeRouters');
const blogRouters = require('./routers/blogRouters');
const accountRouters = require('./routers/accountRouters');


// =========== Connect mongodb with mongoose =========
dotenv.config({ path: 'config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    // useUnifiedTopology: true,
    useNewUrlParser: true,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log(`Database connected successfully`);
  });

// ============= setup ==================
app.use(express.static(path.join(__dirname, 'public')));

const dev = app.get('env') !== 'production';

if (!dev) {
  app.disable('x-powered-by');
  app.use(morgan('common'));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
} else {
  app.use(morgan('dev'));
}




app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT} !!!`);
});

// ============== APIs ==================
const BASE_URL = '/apis';
app.use(`${BASE_URL}/words`, wordRouters);
app.use(`${BASE_URL}/sentences`, sentenceRouters);
app.use(`${BASE_URL}/flashcards`, flashcardRouters);
app.use(`${BASE_URL}/challenges`, challengeRoters);
app.use(`${BASE_URL}/blogs`, blogRouters);
app.use(`${BASE_URL}/accounts`, accountRouters);
