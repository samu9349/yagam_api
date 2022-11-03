const config = {
    db: {
      port:3306,
      host: "127.0.0.1",
      user: "root",
      password: "Password@123",
      database: "yaagam",
    },
    listPerPage: 10,
    payumoneyConfig:{
      key:'oZ7oo9',
      salt:'UkojH5TS',
      payu_url:'https://test.payu.in/_payment',
      payu_fail_url:'http://localhost:4200/payment/fail',
      payu_cancel_url:'http://localhost:3000/api/payment/cancel',
      //payu_cancel_url:'http://localhost:4200/payment/cancel.html',
      callback_url:'http://localhost:3000/api/payment/success'
    },
    clientEmail:'samu9349@gmail.com'
  };
  module.exports = config;