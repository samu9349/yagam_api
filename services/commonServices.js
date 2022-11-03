const db = require('./db');
const helper = require('../helper');


async function getPooja(){
    debugger;
    const rows = await db.query(
      `SELECT poojaId, poojaName, poojaPrice FROM pooja`
    );
    const data = helper.emptyOrRows(rows);  
    return {
      data
    }
  }


module.exports = {
    getPooja
}