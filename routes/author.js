
/**
 * These are example routes for user management
 * This shows how to correctly structure your routes for the project
 */

const express = require("express");
const router = express.Router();
const assert = require('assert');



router.get("/setting", (req, res, next) => {
  //USE this pattern to retrieve data
  //NB. it's better NOT to use arrow functions for callbacks with this library

  global.db.all("SELECT * FROM blogSettings", function (err, rows) {
    if (err) {
      next(err); //send the error on to the error handler
    }
     else {
      // res.json(rows);
      
    }
    res.render("settings.ejs", {updatedSettings: rows});
  });
});



router.post("/settingUpdated", function (req,res) {
  
  let sqlquery = "UPDATE blogSettings SET blog_title = ?, subtitle = ?,author_name=?";
// execute sql query
let newrecord = [req.body. blog_title, req.body.subtitle,req.body.author_name];
db.all(sqlquery, newrecord, (err, result) => 
  {
  if (err) {
  return console.error(err.message);
  }else{
  // res.send(" This book is updated, name: "+ req.body.blog_title + "price "+ req.body.subtitle+"author: "+req.body.author_name);
  res.redirect("/author/home");
  }
  });
});






  router.get("/home", (req, res, next) => {
    //USE this pattern to retrieve data
    //NB. it's better NOT to use arrow functions for callbacks with this library



    global.db.all("SELECT * FROM blogSettings", function(err,rows1) {
      if (err) {
        return console.log('error: ' + err.message);
      }
      global.db.all("SELECT * FROM articlesList where publish='draft'", function(err, rows2) {
        if (err) {
          return console.log('error: ' + err.message);
        }
        global.db.all("SELECT * FROM articlesList where publish='published'", function(err, rows3) {
          if (err) {
            return console.log('error: ' + err.message);
          }
        res.render('home.ejs', {
          updatedSettings: rows1,
          updatedArticles: rows2,
          publishedArticles:rows3
        });
      });
    });
  });
});


 

  router.post("/article", (req, res, next) => {

    global.db.all("SELECT * FROM blogSettings", function(err,rows1) {
      if (err) {
        return console.log('error: ' + err.message);
      }
  
    let chosenId=req.body.id 
    

    global.db.all("SELECT * FROM articlesList where id=?",[chosenId], function (err, rows) {
      if (err) {
        next(err); //send the error on to the error handler
      } else {
        // res.json(rows);
        
      }
      
      res.render("article.ejs", {updatedArticles: rows,updatedSettings:rows1});
    

});
}); 
});


var dt = require("./current_time.js");


router.post("/updateArticle", function (req,res) {
  
let chosenId=req.body.id   

let sqlquery = "UPDATE articlesList SET title = ?, subtitle = ?,last_modified=?,article=? where id=?";
let newrecord = [req.body.title, req.body.subtitle,dt.myDateTime(),req.body.article,chosenId];
db.all(sqlquery, newrecord, (err, result) => 
  {
  if (err) {
  return console.error(err.message);
  }else{
  res.redirect("/author/home");
  }
  });
});

router.post("/publish", function (req,res) {
  
  let chosenId=req.body.id   
  
  let sqlquery = "UPDATE articlesList SET publish=?,last_modified=? where id=?";
  let newrecord = ["published",dt.myDateTime(),chosenId];
  db.all(sqlquery, newrecord, (err, result) => 
    {
    if (err) {
    return console.error(err.message);
    }else{
    res.redirect("/author/home");
    }
    });
  });


  router.post("/delete", function (req,res) {
  
    let chosenId=req.body.id   
    
    let sqlquery = "DELETE FROM articlesList where id=?";
    let newrecord = [chosenId];
    db.all(sqlquery, newrecord, (err, result) => 
      {
      if (err) {
      return console.error(err.message);
      }else{
      res.redirect("/author/home");
      }
      });
    });


    // router.post("/delete", function (req,res) {
  
    //   let chosenId=req.body.id   
      
    //   let sqlquery = "DELETE FROM articlesList where id=?";
    //   let newrecord = [chosenId];
    //   db.all(sqlquery, newrecord, (err, result) => 
    //     {
    //     if (err) {
    //     return console.error(err.message);
    //     }else{
    //     res.redirect("/author/home");
    //     }
    //     });
    //   });



  router.get("/newdraft", (req, res, next) => {
    
    global.db.all("SELECT * FROM blogSettings", function(err,rows1) {
      if (err) {
        return console.log('error: ' + err.message);
      }
 
      res.render("article-newdraft.ejs",{updatedSettings:rows1});
    });
 
  });
 

  


  router.post("/newdraft", (req, res, next) => {
    let sqlquery = "INSERT INTO articlesList (title, subtitle,article,created,last_modified,publish,likes) VALUES (?,?,?,?,?,?,?)";
    // execute sql query
    let newrecord = [req.body.title, req.body.subtitle,req.body.article,dt.myDateTime(),dt.myDateTime(),"draft",0];
    global.db.run(sqlquery, newrecord, (err, result) => {
    if (err) {
    return console.error(err.message);
    }else
  
    res.redirect("/author/home");
    });
  
      
    });

  




///////////////////////////////////////////// HELPERS ///////////////////////////////////////////

/**
 * @desc A helper function to generate a random string
 * @returns a random lorem ipsum string
 */
function generateRandomData(numWords = 5) {
  const str =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";

  const words = str.split(" ");

  let output = "";

  for (let i = 0; i < numWords; i++) {
    output += choose(words);
    if (i < numWords - 1) {
      output += " ";
    }
  }

  return output;
}

/**
 * @desc choose and return an item from an array
 * @returns the item
 */
function choose(array) {
  assert(Array.isArray(array), "Not an array");
  const i = Math.floor(Math.random() * array.length);
  return array[i];
}

module.exports = router;
