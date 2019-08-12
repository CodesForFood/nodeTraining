var db = require('./db');

exports.getAllBooks = function(cb){
    db.query('SELECT book_id, title, first_name, last_name, lms.book.author FROM lms.book LEFT JOIN lms.author ON author = author_id ORDER BY book_id ASC;', function(err, result) {
        cb(err, result);
      });
};

exports.addBook = function(book, cb){
  db.beginTransaction(function(err){
      if(err) cb(err, null);
  
      db.query('insert into lms.book(title, author) values(?,?)', [book.title, book.author], function(err, queryRes){
        
        if(err){
          db.rollback(function(err, res){
            cb(err, res, queryRes);
          });
        } 
        db.commit(function(err, res){
          cb(err, res, queryRes);
        });
      });
    });
};

exports.updateBook = (book, cb) => {
  db.beginTransaction((err) => {
	if(err) cb(err, null);	
    db.query('UPDATE lms.book SET title = ?, author = ? WHERE book_id = ?', 
      [book.title, book.author, book.book_id], (err, queryRes) => {
        if(err){			
          db.rollback((err,res) =>{				
            cb(err, res, queryRes);
          });
        }
      
        db.commit((err, res) =>{         
          cb(err,res, queryRes);
        });
    });
  });
};

exports.removeBook = function(bookId, cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
    
        db.query('delete from lms.book where book_id = ?', [bookId], function(err, queryRes){
          if(err){
            db.rollback(function(err, res){
              cb(err, res, queryRes);
            });
          } 
          db.commit(function(err, res){
            cb(err, res, queryRes);
          });
        });
      });
};