//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
let string = require('lodash/string');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/blogDB');
const postSchema = new mongoose.Schema({title : String, content : String});
const PostModel = mongoose.model("Post", postSchema);
let posts;
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//this is my home page
app.get("/",function (req,res) {
  
  main().catch(err => console.log(err));
  async function main() {
    posts = await PostModel.find();
    console.log(posts);
    res.render("home",{HomeContent : homeStartingContent,Posts : posts});
  }
})

//this is my about page
app.get("/about",function (req,res) {
  res.render("about",{AboutContent:aboutContent});
})

//this is my contact page
app.get("/contact",function (req,res) {
  res.render("contact",{ContactContent:contactContent})
})

//this is my compose page
app.get("/compose",function (req,res) {
  res.render("compose");
})

//here i am showing each post in new separete page
app.get("/posts/:title",function (req,res) {
  
  let urlTitle = string.lowerCase(req.params.title);
  console.log(urlTitle + " is my title");
  posts.forEach(function (post) {
    let postTitle = string.lowerCase(post.title);

    if(postTitle === urlTitle){
      res.render("post",{Post : post});
    }
  })
})

//i am saving post to DB
app.post("/",function (req,res) {
  let post = {
    title : req.body.postTitle,
    content : req.body.postContent
  };

  main().catch(err => console.log(err));
  async function main() {
    await new PostModel(post).save();
  }
  res.redirect("/");
})








app.listen(3000, function() {
  console.log("Server started on port 3000");
});
