const bcrypt = require('bcrypt');

const db = require('./db.js');


function hashear(){
    bcrypt.hash('azteca', 10, function(err, hash) {
        // Store hash in your password DB.
        const query = `INSERT INTO users VALUES(null,"carloscr", ?, "","admin", 0);`;
        console.log(hash);
        db.query(query, [hash], (err, res) =>{
            console.log(query);
            if(err) console.log(err);
        
            console.log(res);
        });
    });

} 

hashear();