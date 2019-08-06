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

routes.post('/author', (req, res) => {
  var author = req.body;
  authorDao.addAuthor(author, (err, result) => {
    if(err){
      res.status(400);
      res.send("Failed to add author");
    }

    res.status(201);
    res.send('Successfully added the author');        
  });
});

routes.put('/author', (req, res) => {
  var author = req.body;
  authorDao.updateAuthor(author, (err, result) =>{
    if(err){
      res.status(400);
      res.send('Failed to update the author');
    }
    res.status(200);
    res.send('Successfully updated the author');
  });
});

routes.delete('/author/:id', (req, res) => {
  authorDao.removeAuthor(req.params.id, (err, result) => {
    if(err){
      res.status(400);
      res.send('Failed the remove the Author');
    }
    res.send('Successfully removed the Author');
  });
});


module.exports = routes;
