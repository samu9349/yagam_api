const db = require('./db');
const helper = require('../helper');



async function createParticipant(req) {
  let query = "call SAVEPARTICIPANT('" + req.husbandName + "', '" + req.address + "', '" + req.contactNo + "', '" + req.husbandNakshathram + "','" + req.email + "','" + req.wifeName + "','" + req.wifeNakshathram + "')";
  const result = await db.query(
    query
  );
  let message = { id: result[0][0]["LAST_INSERT_ID()"], message: 'User created successfully' };
  return { message };
}

async function createPaymentResponse(req) {
  let query = "call SAVEPAYMENTRESPONSE('" + req.statusId + "', '" + req.msg + "', '" + req.mihpayid + "', '" + req.request_id + "','" + req.bank_ref_num + "','" + req.amt + "','" + req.transaction_amount + "','" + req.txnid + "','" + req.additional_charges + "','" + req.productinfo + "','" + req.firstname + "','" + req.bankcode + "','" + req.udf1 + "','" + req.udf3 + "','" + req.udf4 + "','" + req.udf5 + "','" + req.field2 + "','" + req.field9 + "','" + req.error_code + "','" + req.addedon + "','" + req.payment_source + "','" + req.card_type + "','" + req.error_Message + "','" + req.net_amount_debit + "','" + req.disc + "','" + req.mode + "','" + req.PG_TYPE + "','" + req.card_no + "','" + req.name_on_card + "','" + req.udf2 + "','" + req.transactionStatus + "','" + req.unmappedstatus + "','" + req.Merchant_UTR + "','" + req.Settled_At + "')";
  const result = await db.query(
    query
  );
  let message = { id: result[0][0]["LAST_INSERT_ID()"], message: 'User created successfully' };
  return { message };
}

async function updateResponseId(bookingId,responseId){
  const result = await db.query(
    `UPDATE participant set paymentResponseId='${responseId}'  where participantId=${bookingId}`
  );

  let message = 'Error in updating ';

  if (result.affectedRows) {
    message = 'updated successfully';
  }

  return {message};
}

async function updateMailStatus(bookingId,status){
  const result = await db.query(
    `UPDATE participant set mailSendStatus='${status}'  where participantId=${bookingId}`
  );

  let message = 'Error in updating ';

  if (result.affectedRows) {
    message = 'updated successfully';
  }

  return {message};
}


async function getParticipant(participantId){
  let query = "call GETPARTICIPANT('" + participantId + "')";
  const rows = await db.query(
    query
  );
  const data = helper.emptyOrRows(rows);  
  return {
    data
  }
}

async function createParticipantPooja(req) {
  for (let index = 0; index < req.length; index++) {
    const element = req[index];
    let query = "call SAVEPARTICIPANTPOOJA('" + element.participantId + "', '" + element.poojaId + "','" + element.startDate + "','" + element.startTime + "','" + element.noOfSavana + "','" + element.endDate + "','" + element.endTime + "')";
    const result = await db.query(
      query
    );
  }
  let message = { id: 1, message: 'saved created successfully' };
  return { message };
}

module.exports = {
  createParticipant,
  createParticipantPooja,
  createPaymentResponse,
  updateResponseId,
  getParticipant,
  updateMailStatus
}