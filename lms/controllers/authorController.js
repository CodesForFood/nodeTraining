var routes = require('express').Router();
var db = require('../dao/db');
var authorDao = require('../dao/authorDao');

routes.get('/authors',function(req,res){
    authorDao.getAllAuthors(function(error, result){
      if(error) throw error;
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    });
});

routes.get('/author/:id', function(req, res){
  authorDao.getAuthor(req.params.id, (err, result) =>{
      if(err) throw err;
      res.setHeader("Content-Type", "application/json");
      res.send(result);
  });
});



routes.post('/author', (req, res) => {
  var author = req.body;
  authorDao.addAuthor(author, (err, result, queryRes) => {
    if(err){
      res.status(400);
      res.send("Failed to add author");
    }

    res.status(201);
    res.send(queryRes);        
  });
});

routes.put('/author', (req, res) => {
  var author = req.body;
  authorDao.updateAuthor(author, (err, result, queryRes) =>{
    if(err){
      res.status(400);
      res.send('Failed to update the author');
    }
    res.status(200);
    res.send(queryRes);
  });
});

routes.delete('/author/:id', (req, res) => {
  authorDao.removeAuthor(req.params.id, (err, result, queryRes) => { 
    if(err){     
      res.status(400);
      res.send(queryRes);
    }
    else if(queryRes.affectedRows == 0){
      res.status(400);
      res.send(queryRes);
    }
    else{
      res.send(queryRes); 
    }            
  });
});


module.exports = routes;
