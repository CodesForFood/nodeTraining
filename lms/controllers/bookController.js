var routes = require('express').Router();
var db = require('../dao/db');
var bookDao = require('../dao/bookDao');

routes.get('/books',function(req,res){
    bookDao.getAllBooks(function(error, result){
      if(error) throw error;
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    });
});

routes.post('/book', function(req, res){
  var book = req.body;
  bookDao.addBook(book, function(err, result, queryRes){
    if(err){
      res.status(400);
      res.send('Add Book Failed!');
    }
    res.status(201);
    res.send(queryRes);
  });
  
});

routes.put('/book', (req, res) => {
    var book = req.body;
    bookDao.updateBook(book, (err, result, queryRes) =>{
      if(err){
        res.status(400);
        res.send('Update book failed');
      }
      res.status(200);
      res.send(queryRes);
    });
});

routes.delete('/book/:id', function(req, res){
  bookDao.removeBook(req.params.id, function(err, result, queryRes){
    if(err){
      res.status(400);
      res.send('Delete Book Failed!');
    }
    res.send(queryRes);
  });
});

module.exports = routes;
