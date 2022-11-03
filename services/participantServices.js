const db = require('./db');
const helper = require('../helper');



async function createParticipant(req) {
  let query = "call SAVEPARTICIPANT('" + req.participantName + "', '" + req.participantAddress + "', '" + req.participantContactNo + "', '" + req.participantNakshathram + "')";
  const result = await db.query(
    query
  );
  let message = { id: result[0][0]["LAST_INSERT_ID()"], message: 'User created successfully' };
  return { message };
}


async function createParticipantPooja(req) {
  for (let index = 0; index < req.length; index++) {
    const element = req[index];
    let query = "call SAVEPARTICIPANTPOOJA('" + element.participantId + "', '" + element.poojaId + "')";
    const result = await db.query(
      query
    );
  }
  let message = { id: 1, message: 'saved created successfully' };
  return { message };
}

module.exports = {
  createParticipant,
  createParticipantPooja
}