const express = require('express');
const bodyParser = require ("body-parser");
const app = express();
const port = 3000;
const sqlite3 = require('sqlite3').verbose();
app.use(bodyParser.urlencoded({ extended: true }));
//items in the global namespace are accessible throught out the node application
global.db = new sqlite3.Database('./database.db',function(err){
  if(err){
    console.error(err);
    process.exit(1); //Bail out we can't connect to the DB
  }else{
    console.log("Database connected");
    global.db.run("PRAGMA foreign_keys=ON"); //This tells SQLite to pay attention to foreign key constraints
  }
});

app.use('/public', express.static('public'));
const readerRoutes = require('./routes/reader');
const authorRoutes = require('./routes/author');

//set the app to use ejs for rendering
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('Hello World!')
});

//this adds all the userRoutes to the app under the path /user
app.use('/reader', readerRoutes);
app.use('/author', authorRoutes);
app.use(express.static('img'));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

