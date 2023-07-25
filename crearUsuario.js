const bcrypt = require('bcrypt');

const db = require('./db.js');


function hashear(){
    bcrypt.hash('A@ZIngenieros', 10, function(err, hash) {
        // Store hash in your password DB.
        const query = `INSERT INTO users VALUES(null,"admin", ?, "","admin", 1);`;
        console.log(hash);
        db.query(query, [hash], (err, res) =>{
            if(err) console.log(err);
        
            console.log(res);
        });
    });

} 

hashear();