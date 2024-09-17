
/**
 * These are example routes for user management
 * This shows how to correctly structure your routes for the project
 */

const express = require("express");
const router = express.Router();

router.get("/home", (req, res, next) => {
  
  global.db.all("SELECT * FROM blogSettings", function(err,rows1) {
    if (err) {
      return console.log('error: ' + err.message);
    }
  global.db.all("SELECT * FROM articlesList where publish='published'", function(err, rows2) {
    if (err) {
      return console.log('error: ' + err.message);
    }
 res.render("home-reader.ejs",{updatedSettings:rows1,publishedArticles:rows2})
});
});
});

router.post("/article", (req, res, next) => {
  

  let chosenId=req.body.id  
 
  global.db.all("SELECT * FROM blogSettings", function(err,rows1) {
    if (err) {
      return console.log('error: ' + err.message);
    }
    global.db.all("SELECT * FROM articlesList where id=?",[chosenId],function(err, rows2) {
      if (err) {
        return console.log('error: ' + err.message);
      }

      global.db.all("SELECT * FROM commentSection where id=?",[chosenId],function(err, rows3) {
        if (err) {
          return console.log('error: ' + err.message);
        }

      res.render("article-reader.ejs",{updatedSettings:rows1,publishedArticles:rows2,allComments:rows3})
 
});
});
});
});

var dt = require("./current_time.js");

router.post("/comment", (req, res, next) => {
  let chosenId=req.body.id  

  let sqlquery = "INSERT INTO commentSection  (id,comment,posted) VALUES (?,?,?)";
    // execute sql query
    let newrecord = [chosenId,req.body.comment,dt.myDateTime()];
    global.db.run(sqlquery,newrecord, (err, result) => {
    if (err) {
    return console.error(err.message);
    }
    res.redirect(307,"/reader/article");
});
});

router.post("/like", function (req,res) {
  
  let chosenId=req.body.id;
  

  let sqlquery = "UPDATE articlesList SET likes = likes + 1 where id=?";
  let newrecord = [chosenId];
  db.all(sqlquery, newrecord, (err, result) => 
    {
    if (err) {
    return console.error(err.message);
    }else{
      res.redirect(307,"/reader/article");
    }
    });
  });
  


module.exports = router;
