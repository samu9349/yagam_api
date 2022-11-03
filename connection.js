const mysql=require('mysql');
var connection=mysql.createConnection({
     port:3306,
     host:'68.178.145.32',
     user:'yagam',
     password:'Yagam@123',
     database:'yagam'
});

connection.connect((err)=>{
    if(!err){
        console.log('connected')
    }else{
        console.log(err)
    }
});

module.exports = connection;
