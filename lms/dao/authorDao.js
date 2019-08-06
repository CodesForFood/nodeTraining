var db = require('./db');

exports.getAllAuthors = function(cb){
    db.query('select * from lms.author', function(err, result) {
        cb(err, result);
      });
};

exports.addAuthor = (author, cb) => {
  db.beginTransaction((err) => {
      if(err) cb(err, null);
  
      db.query('INSERT INTO lms.author (first_name, last_name) VALUES (?, ?)', [author.first_name, author.last_name], (err, res) => {
        if(err){
          db.rollback((err, res) => {
            cb(err, res);
          });
        } 
        db.commit((err, res) => {
          cb(err, res);
        });
      });
    });
};

exports.updateAuthor = (author, cb) => {
  db.beginTransaction((err) => {
    if(err) cb(err, null);	    

    db.query('UPDATE lms.author SET first_name = ?, last_name = ? WHERE author_id = ?', 
      [author.first_name, author.last_name, author.author_id], (err, res) => {
        if(err){			
          db.rollback((err,res) =>{				
            cb(err, res);
          });
        }
      
        db.commit((err, res) =>{	         
          cb(err,res);
        });
    });
  });
};

exports.removeAuthor = (authorId, cb) => {
  db.beginTransaction((err) => {
    if(err) cb(err, null);

    db.query('DELETE FROM lms.author WHERE author_id = ?', [authorId], (err, res) => {      
      if(err){       
        db.rollback((err, res) => {       
          cb(err, res);          
        });
      }       
      else{       
        db.commit((err, res) => {        
          cb(err, res);
        });
      }  
      
    });
  });
};