
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const { endsWith } = require("lodash");

const homeStartingContent = " Home Page Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "About Page Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Contact Page Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const posts = [];

app.get("/",(req,res)=>{
  res.render("home",{
    homeStratingContent : homeStartingContent,
    content:posts
  });
});



app.get("/about",(req,res)=>{
  res.render("about",{
    aboutContent : aboutContent
  });
});

app.get("/contact",(req,res)=>{
  res.render("contact",{
    contactContent : contactContent
  });
});

app.get("/compose",(req,res)=>{
  res.render("compose");
});

app.post("/compose",(req,res)=>{
  const post = {
    title:req.body.postTitle,
    content:req.body.postContent
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postId",(req,res)=>{
  posts.forEach((element) => {  //element in parenthesis is optional until you have single parameter
    if(_.lowerCase(element.title) === _.lowerCase(req.params.postId)){
      // console.log("Match Found");
      res.render("post",{
        title:element.title,
        content:element.content
      });
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
