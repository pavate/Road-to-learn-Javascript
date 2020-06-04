const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//TODO
mongoose.connect('mongodb://localhost:27017/wikiDB', {
  useNewUrlParser: true
});

//creating a schema
const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);

////////////////////////////Request Targetting all articles///////////

app.route("/articles")

.get(function(req, res) {
  Article.find(function(err, foundArticles) {
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
    console.log(foundArticles);
  })
})


.post(function(req, res) {
  console.log();
  console.log();

  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });
  newArticle.save(function(err) {
    if (!err) {
      res.send("successful");
    } else {
      res.send(err);
    }
  });
})


.delete(function(req, res) {
  Article.deleteMany(function(err) {
    if (!err) {
      res.send("successfully deleted");
    } else {
      res.send(err);
    }
  });
});

////////////////////////////Request Targetting specific articles///////////

app.route("/articles/:articleTitle")

.get(function(req,res){


  Article.findOne({title:req.params.articleTitle},function(err,foundArticle){

if(foundArticle){
  res.send(foundArticle);
}else{
  res.send("nope");
}

});

})
.put(function(req,res){
  Article.update(
    {title: req.params.articleTitle},
    {title:req.body.title,content: req.body.content},
    {overwrite:true},
    function(err){
      if(!err){
        res.send("ok its changed");
      }
    }
  );
})

.patch(function(req,res) {
  Article.update(
  {title: req.params.articleTitle},
  {$set:req.body},
  function(err){
    if(!err){
      res.send("ok its changed")
    }else{
      res.send(err);
    }
  }
);

})
.delete(function(req,res){
  Article.deleteOne(
    {title: req.params.articleTitle},
    function(err){
      if(!err){
        res.send("ok its deleted");
      }else{
        res.send(err);
      }
    }
  )
});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
