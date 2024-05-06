const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Word = require('../models/wordModel');
const { error } = require('console');

// Connect database
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true
}).then(() => {
  console.log(`Database connected successfully`);
});

// READ JSON FILE
const words = JSON.parse(fs.readFileSync(`${__dirname}/words.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
    try {
        await Word.create(words);
        console.log('Data success loaded');
    } catch (error) {
        console.log(error);
    }
    process.exit();
}

// DELETE ALL DATA FROM DB
const deleteAll = async() => {
    try {
        await Word.deleteMany();
        console.log("Delete all data success");
    } catch (error) {
        console.log(error);
    }
    process.exit();
}
if(process.argv[2] === '--import') {
    importData();
}else if (process.argv[2] === '--delete') {
    deleteAll();
}

console.log(process.argv);

// node data/import-dev-data.js --import