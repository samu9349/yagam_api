const config = {
    db: {
      port:3306,
     host:'68.178.145.32',
     user:'yagam',
     password:'Yagam@123',
     database:'yagam'
    },
    listPerPage: 10,
    payumoneyConfig:{
      key:'oZ7oo9',
      salt:'UkojH5TS',
      payu_url:'https://test.payu.in/_payment',
      // payu_fail_url:'http://localhost:4200/payment/fail',
      // payu_cancel_url:'http://localhost:3000/api/payment/cancel',
      // callback_url:'http://localhost:3000/api/payment/success'
      payu_fail_url:'https://yagamapi.onrender.com/api/payment/fail',
      payu_cancel_url:'https://yagamapi.onrender.com/api/payment/cancel',
      callback_url:'https://yagamapi.onrender.com/api/payment/success'
    },
    clientConfig:{
      // successPaymentRedirection:'http://localhost:4200/#/payment/success',
      // cancelPaymentRedirection:'http://localhost:4200/#/payment/cancel'
      successPaymentRedirection:'https://puthrakameshtiyagam.com/#/payment/success',
      cancelPaymentRedirection:'https://puthrakameshtiyagam.com/#/payment/cancel'
    },
    mailConfig:{
      host:'puthrakameshtiyagam.com',
      user:'info@puthrakameshtiyagam.com',
      password:'Yagam@123',
      port:465,
    }
  };
  module.exports = config;