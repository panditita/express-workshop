const express = require('express');
const app = express();
const formidable = require('express-formidable');
const fs = require("fs");


app.use(express.static("public"));
app.use(formidable());


app.post("/create-post", function (req, res) {
    //red the file - string
    // change into object - JSON.parse
    // append to the object
    // blogPost[Date.now()] = req.fields.blogpost
    // we write to file JSON.stringify(blogPost)
    //cal back - we return 200 (ok)to client

    const filePath = __dirname + "/data/posts.json";

    fs.readFile(filePath, function(error, data){
        const postsContent = JSON.parse(data);
        const timeStamp = Date.now();
        postsContent[timeStamp] = req.fields.blogpost;
        fs.writeFile(filePath, JSON.stringify(postsContent, null, 2), function() {
          //  res.send(200, JSON.stringify(postsContent, null, 2));  this returns all posts
          res.send(200, JSON.stringify(req.fields.blogpost)); //this returns latest post
        });
    });

    //console.log(postsContent);

});
app.listen(3000, () => {
    console.log("Server is up on port 3000")
});


