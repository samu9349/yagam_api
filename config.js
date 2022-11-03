const config = {
    db: {
      port:3306,
      host: "68.178.145.32",
      user: "yagam",
      password: "Yagam@123",
      database: "yagam",
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
