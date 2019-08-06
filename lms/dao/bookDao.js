var db = require('./db');

exports.getAllBooks = function(cb){
    db.query('select * from lms.book', function(err, result) {
        cb(err, result);
      });
};

exports.addBook = function(book, cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
    
        db.query('insert into lms.book(title, author) values(?,?)', [book.title, book.author], function(err, res){
          if(err){
            db.rollback(function(err, res){
              cb(err, res);
            });
          } 
          db.commit(function(err, res){
            cb(err, res);
          });
        });
      });
};

exports.updateBook = (book, cb) => {
  db.beginTransaction((err) => {
	if(err) cb(err, null);	
	console.log(book);

	db.query('UPDATE lms.book SET title = ?, author = ? WHERE book_id = ?', 
		[book.title, book.author, book.book_id], (err, res) => {
			if(err){			
				db.rollback((err,res) =>{				
					cb(err, res);
				});
			}
		
			db.commit((err, res) =>{	
				console.log(res);
				cb(err,res);
			});
	});
  });
};

exports.removeBook = function(bookId, cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
    
        db.query('delete from lms.book where book_id = ?', [bookId], function(err, res){
          if(err){
            db.rollback(function(err, res){
              cb(err, res);
            });
          } 
          db.commit(function(err, res){
            cb(err, res);
          });
        });
      });
};