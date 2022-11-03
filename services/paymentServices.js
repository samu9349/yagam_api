"use strict";
const payUMoney = require("payumoney_nodejs");
class PaymentService {
    constructor() {
        // Set you MERCHANT_KEY, MERCHANT_SALT_KEY, PAYUMONEY_AUTHORIZATION_HEADER
        // for both Production and Sandox Account
        payUMoney.setProdKeys("MERCHANT_KEY", "MERCHANT_SALT", "PAYUMONEY_AUTHORIZATION_HEADER");
        payUMoney.setSandboxKeys("MERCHANT_KEY", "MERCHANT_SALT", "PAYUMONEY_AUTHORIZATION_HEADER");
        payUMoney.isProdMode(false);
    }
    makePayment(paymentBody, callback) {
        payUMoney.pay(paymentBody, (error, response) => {
            if (error) {
                console.error("makePayment error : " + error);
                callback(error, null);
            }
            else {
                console.log("Payment Redirection link " + response);
                callback(error, { url: response });
            }
        });
    }
    paymentSuccess(paymentSuccessBody, callback) {
        console.log("Payment Success");
        console.log("Payment Details : " + JSON.stringify(paymentSuccessBody));
        // You can Update your user payment Success status here
        callback(null, { status: "Payment Success" });
    }
    paymentFailure(paymentFailureBody, callback) {
        console.log("Payment Failure");
        console.log("Payment Details : " + JSON.stringify(paymentFailureBody));
        // You can Update your user payment Failure status here
        callback(null, { status: "Payment Failed" });
    }
}
Object.seal(PaymentService);
module.exports = PaymentService;
//# sourceMappingURL=PaymentService.js.map