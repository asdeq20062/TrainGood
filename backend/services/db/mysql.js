const mysql = require('mysql2');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });


function database(){
    // connection setting
    const connection = mysql.createPool({
        host: process.env['DB_HOST'] || '127.0.0.1',
        user: process.env['DB_USER'] || 'root',
        password: process.env['DB_PW'] || '123456',
        database: process.env['DB_DB'] || 'traingood'
    });
    // exec connection
    /*
    connection.connect(function(err){
        if (err) throw err;
        console.log("Connected database.");
    });
    */
   console.log(process.env['DB_USER']);
    return connection;
}

function db_query(db, sql_query){
    return new Promise((resolve, reject) => {
        if(sql_query){
            db.query(sql_query, function(err, result, fields){
                if (err) throw err;
                resolve(result);
            })
        }
    });
}

module.exports = {
    database,
    db_query
};



