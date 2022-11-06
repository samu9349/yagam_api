const db = require('./db');
const helper = require('../helper');

async function getUsers(){
  const rows = await db.query(
    `SELECT userId, userName
    FROM users`
  );
  const data = helper.emptyOrRows(rows);  
  return {
    data
  }
}

async function createUser(programmingLanguage){
  const result = await db.query(
    `INSERT INTO users 
    (userId,userName, email) 
    VALUES 
    (${programmingLanguage.userId}, ${programmingLanguage.userName}, ${programmingLanguage.email})`
  );

  let message = 'Error in creating user';

  if (result.affectedRows) {
    message = 'User created successfully';
  }

  return {message};
}

module.exports = {
    getUsers,
    createUser
}