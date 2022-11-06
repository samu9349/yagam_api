const express = require('express');
const router = express.Router();
const userService = require('../services/userServices');
const participantService = require('../services/participantServices');
const commonService = require('../services/commonServices');
const config = require("../config")
const request = require('request');
var nodemailer = require('nodemailer');
var crypto = require('crypto');

router.get('/user', async function (req, res, next) {
	try {
		res.json(await userService.getUsers());
	} catch (err) {
		console.error(`Error while getting user`, err.message);
		next(err);
	}
});

router.post('/user/saveuser', async function (req, res, next) {
	try {
		res.json(await userService.createUser(req.body));
	} catch (err) {
		console.error(`Error while save users`, err.message);
		next(err);
	}
});


router.post('/participant/saveparticipant', async function (req, res, next) {
	try {
		res.json(await participantService.createParticipant(req.body));
	} catch (err) {
		console.error(`Error while saving`, err.message);
		next(err);
	}
});

router.post('/payment/savePaymentResponse', async function (req, res, next) {
	try {
		res.json(await participantService.createPaymentResponse(req.body));
	} catch (err) {
		console.error(`Error while saving`, err.message);
		next(err);
	}
});

router.post('/participant/saveparticipantpooja', async function (req, res, next) {
	try {
		res.json(await participantService.createParticipantPooja(req.body));
	} catch (err) {
		console.error(`Error while save`, err.message);
		next(err);
	}
});

router.get('/common/getAllPooja', async function (req, res, next) {
	var transporter = nodemailer.createTransport({
		service: 'puthrakameshtiyagam',
		auth: {
		  user: 'alerts@puthrakameshtiyagam.com',
		  pass: 'vysakh123.'
		}
	  });
	  
	  var mailOptions = {
		from: 'alerts@puthrakameshtiyagam.com',
		to: 'samu9349@gmail.com',
		subject: 'Payment Successfull',
		html: 'That was easy!'
	  };
	  
	  transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		  console.log(error);
		} else {
		  console.log('Email sent: ' + info.response);
		}
	  });
	try {
		res.json(await commonService.getPooja());
	} catch (err) {
		console.error(`Error while getting users`, err.message);
		next(err);
	}
});

router.post('/payment_gateway/payumoney', async function (request, res, next) {
	let req = request.body;
	const txnId = `yagam${Math.round(new Date().getTime() + (Math.random() * 100))}`;
	const plan_name = 'Yaagam booking_' + req.bookingId.toString();
	let req_details = {};
	req_details.txnid = txnId;
	req_details.service_provider = '';
	req_details.amount = req.amount;
	req_details.plan_name = plan_name;
	req_details.callback_url = config.payumoneyConfig.callback_url;
	req_details.first_name = req.fullname;
	req_details.email = req.email;
	req_details.mobile = req.mobile;
	req_details.payu_merchant_key = config.payumoneyConfig.key;
	req_details.payu_merchant_salt_version_1 = config.payumoneyConfig.salt;
	req_details.payu_url = config.payumoneyConfig.payu_url;
	req_details.payu_fail_url = config.payumoneyConfig.payu_fail_url;
	req_details.payu_cancel_url = config.payumoneyConfig.payu_cancel_url;
	req_details.udf5 = 'PayUBiz_NODE_JS_KIT'
	let hashSequence = config.payumoneyConfig.key + "|" + txnId + "|" + req.amount + "|" + plan_name + "|" + req.fullname + "|" + config.clientEmail + "|" +
		"|||||" + "|" + "|" + "|" + "|" + "|" + config.payumoneyConfig.salt;

	req_details.payu_sha_token = require('crypto').createHash('sha512').update(hashSequence, 'utf-8').digest('hex');
	res.json({
		info: req_details
	});
});
router.post('/payment/cancel', function (req, res) {
	res.redirect(config.clientConfig.cancelPaymentRedirection)
});

router.post('/payment/success', function (req, res) {
	var verified = 'No';
	var txnid = req.body.txnid;
	var amount = req.body.amount;
	var productinfo = req.body.productinfo;
	var firstname = req.body.firstname;
	var email = req.body.email;
	var udf5 = req.body.udf5;
	var mihpayid = req.body.mihpayid;
	var status = req.body.status;
	var resphash = req.body.hash;
	var additionalcharges = "";
	//Calculate response hash to verify	
	var keyString = config.payumoneyConfig.key + '|' + txnid + '|' + amount + '|' + productinfo + '|' + firstname + '|' + email + '|||||' + udf5 + '|||||';
	var keyArray = keyString.split('|');
	var reverseKeyArray = keyArray.reverse();
	var reverseKeyString = config.payumoneyConfig.salt + '|' + status + '|' + reverseKeyArray.join('|');
	//check for presence of additionalcharges parameter in response.
	if (typeof req.body.additionalCharges !== 'undefined') {
		additionalcharges = req.body.additionalCharges;
		//hash with additionalcharges
		reverseKeyString = additionalcharges + '|' + reverseKeyString;
	}
	//Generate Hash
	var cryp = crypto.createHash('sha512');
	cryp.update(reverseKeyString);
	var calchash = cryp.digest('hex');

	var msg = 'Payment failed for Hash not verified...<br />Check Console Log for full response...';
	//Comapre status and hash. Hash verification is mandatory.
	if (calchash == resphash)
		msg = 'Transaction Successful and Hash Verified...<br />Check Console Log for full response...';

	console.log(req.body);

	//Verify Payment routine to double check payment
	var command = "verify_payment";

	var hash_str = config.payumoneyConfig.key + '|' + command + '|' + txnid + '|' + config.payumoneyConfig.salt;
	var vcryp = crypto.createHash('sha512');
	vcryp.update(hash_str);
	var vhash = vcryp.digest('hex');

	var vdata = '';
	var details = '';

	var options = {
		method: 'POST',
		uri: 'https://test.payu.in/merchant/postservice.php?form=2',
		form: {
			key: config.payumoneyConfig.key,
			hash: vhash,
			var1: txnid,
			command: command
		},
		headers: {
			/* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
		}
	};

	request(options)
		.on('response', function (resp) {
			debugger;
			console.log('STATUS:' + resp.statusCode);
			resp.setEncoding('utf8');
			resp.on('data', function (chunk) {
				vdata = JSON.parse(chunk);
				if (vdata.status == '1') {
					details = vdata.transaction_details[txnid];
					console.log(details['status'] + '   ' + details['mihpayid']);
					if (details['status'] == 'success' && details['mihpayid'] == mihpayid)
						verified = "Yes";
					else
						verified = "No";
					let data = {
						statusId: resp.statusCode,
						msg: msg,
						mihpayid: mihpayid,
						request_id: req.body.bank_ref_num,
						bank_ref_num: req.body.bank_ref_num,
						amt: amount,
						transaction_amount: amount,
						txnid: txnid,
						additional_charges: additionalcharges,
						productinfo: productinfo,
						firstname: firstname,
						bankcode: req.body.bankcode,
						udf1: req.body.udf1,
						udf3: req.body.udf3,
						udf4: req.body.udf4,
						udf5: req.body.udf5,
						field2: req.body.field2,
						field9: req.body.field9,
						error_code: req.body.error,
						addedon: req.body.addedon,
						payment_source: req.body.payment_source,
						card_type: req.body.cardCategory,
						error_Message: req.body.error_Message,
						net_amount_debit: req.body.net_amount_debit,
						disc: req.body.discount,
						mode: req.body.mode,
						PG_TYPE: req.body.PG_TYPE,
						card_no: req.body.cardnum,
						name_on_card: req.body.firstname,
						udf2: req.body.udf2,
						transactionStatus: req.body.status,
						unmappedstatus: req.body.unmappedstatus,
						Merchant_UTR: '',
						Settled_At: req.body.addedon
					};
					participantService.createPaymentResponse(data).then(response => {
					
						let bookingid=productinfo.split('_')[1];
						participantService.updateResponseId(bookingid,txnid).then(response1=>{
							let booking={};
							commonService.sendMail(email,booking);
							res.redirect(config.clientConfig.successPaymentRedirection);
						});
					});
				}
			});
		})
		.on('error', function (err) {
			console.log(err);
		});
});


module.exports = router;