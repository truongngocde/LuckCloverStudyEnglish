const mongoose = require('mongoose');
const dotenv = require('dotenv');

// import third-party
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const https = require('https');


// import local file
const {MAX} = require('./constant');
const wordRouters = require('./routers/wordRouters');


// ============== set port ==============
const app = express();
const normalizePort = (port) => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || '8080');


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

// ============== APIs ==================
const BASE_URL = '/apis';
app.use(`${BASE_URL}/words`, wordRouters)

// =========== Connect mongodb with mongoose =========
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    // useUnifiedTopology: true,
    // useNewUrlParser: true,
    //useCreateIndex: true,
  })
  .then(() => {
    console.log(`Database connected successfully`);
  });


// ================== config ==================
// app.use(express.json({ limit: MAX.SIZE_JSON_REQUEST }));
// app.use(express.urlencoded({ limit: MAX.SIZE_JSON_REQUEST }));
// app.use(cookieParser());
// app.use(cors(corsConfig));

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT} !!!`);
})



