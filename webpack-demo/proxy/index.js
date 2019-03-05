const express = require('express');
const app = express();

app.listen(8000, () => {
    console.log("target");
})

app.get('/api/test', function(req,res){

    res.end("hello world")
  
});

app.get('/test', function(req,res){

    res.end("hello world")
  
});