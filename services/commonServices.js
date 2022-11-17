const db = require('./db');
const helper = require('../helper');
var nodemailer = require('nodemailer');
const config = require("../config")


async function getPooja() {
    const rows = await db.query(
        `SELECT poojaId, poojaName, poojaPrice,isDisplay FROM pooja`
    );
    const data = helper.emptyOrRows(rows);
    return {
        data
    }
}
function contactUs(data) {
    let htmlBody = `
   <table border="0" cellpadding="0" cellspacing="0" height="200px" width="100%" bgcolor="#F7F7F7">
       <tr>
           <td>
               First Name
           </td>
           <td>
               {FIRSTNAME}
           </td>
       </tr>
       <tr>
           <td>
               Phone No
           </td>
           <td>
               {PHONE}
           </td>
       </tr>
       <tr>
           <td>
               Email
           </td>
           <td>
               {EMAIL}
           </td>
       </tr>
       <tr>
           <td>
               Message
           </td>
           <td>
               {MESSAGE}
           </td>
       </tr>
   </table>`;

    htmlBody = htmlBody.replace('{FIRSTNAME}', data.firstName);
    htmlBody = htmlBody.replace('{PHONE}', data.phone);
    htmlBody = htmlBody.replace('{EMAIL}', data.email);
    htmlBody = htmlBody.replace('{MESSAGE}', data.message);



    const mailTransport = nodemailer.createTransport({
        host: config.mailConfig.host,
        secure: true,
        secureConnection: false, // TLS requires secureConnection to be false
        tls: {
            ciphers: 'SSLv3'
        },
        requireTLS: true,
        port: 465,
        debug: true,
        auth: {
            user: config.mailConfig.user,
            pass: config.mailConfig.password
        }
    });

    const mailOptions = {
        from: config.mailConfig.user,
        to: config.mailConfig.user,
        subject: `Enquiry from Customer`,
        html: htmlBody
    };

    mailTransport.sendMail(mailOptions).then(() => {
        console.log('Email sent successfully');
    }).catch((err) => {
        console.log('Failed to send email');
        console.error(err);
    });


}
function sendMail(toAddress, booking) {
    let htmlBody = `<html xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <meta name="viewport" content="width=device-width">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="format-detection" content="telephone=no">
        <style>
            body,
            p {
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                -webkit-font-smoothing: antialiased;
                -webkit-text-size-adjust: none;
            }
    
            table {
                border-collapse: collapse;
                border-spacing: 0;
                border: 0;
                padding: 0;
            }
    
            img {
                margin: 0;
                padding: 0;
            }
    
            .content {
                width: 600px;
            }
    
            .no_text_resize {
                -moz-text-size-adjust: none;
                -webkit-text-size-adjust: none;
                -ms-text-size-adjust: none;
                text-size-adjust: none;
            }
    
            /* Media Queries */
            @media all and (max-width: 600px) {
    
                table[class="content"] {
                    width: 100% !important;
                }
    
                tr[class="grid-no-gutter"] td[class="grid__col"] {
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                }
    
                td[class="grid__col"] {
                    padding-left: 18px !important;
                    padding-right: 18px !important;
                }
    
                table[class="small_full_width"] {
                    width: 100% !important;
                    padding-bottom: 10px;
                }
    
                a[class="header-link"] {
                    margin-right: 0 !important;
                    margin-left: 10px !important;
                }
    
                a[class="btn"] {
                    width: 100%;
                    border-left-width: 0px !important;
                    border-right-width: 0px !important;
                }
    
                table[class="col-layout"] {
                    width: 100% !important;
                }
    
                td[class="col-container"] {
                    display: block !important;
                    width: 100% !important;
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                }
    
                td[class="col-nav-items"] {
                    display: inline-block !important;
                    padding-left: 0 !important;
                    padding-right: 10px !important;
                    background: none !important;
                }
    
                img[class="col-img"] {
                    height: auto !important;
                    max-width: 520px !important;
                    width: 100% !important;
                }
    
                td[class="col-center-sm"] {
                    text-align: center;
                }
    
                tr[class="footer-attendee-cta"]>td[class="grid__col"] {
                    padding: 24px 0 0 !important;
                }
    
                td[class="col-footer-cta"] {
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                }
    
                td[class="footer-links"] {
                    text-align: left !important;
                }
    
                .hide-for-small {
                    display: none !important;
                }
    
                .ribbon-mobile {
                    line-height: 1.3 !important;
                }
    
                .small_full_width {
                    width: 100% !important;
                    padding-bottom: 10px;
                }
    
                .table__ridge {
                    height: 7px !important;
                }
    
                .table__ridge img {
                    display: none !important;
                }
    
    
    
                .summary-table__total {
                    padding-right: 10px !important;
                }
    
                .app-cta {
                    display: none !important;
                }
    
                .app-cta__mobile {
                    width: 100% !important;
                    height: auto !important;
                    max-height: none !important;
                    overflow: visible !important;
                    float: none !important;
                    display: block !important;
                    margin-top: 12px !important;
                    visibility: visible;
                    font-size: inherit !important;
                }
    
                /* List Event Cards */
                .list-card__header {
                    width: 130px !important;
                }
    
                .list-card__label {
                    width: 130px !important;
                }
    
                .list-card__image-wrapper {
                    width: 130px !important;
                    height: 65px !important;
                }
    
                .list-card__image {
                    max-width: 130px !important;
                    max-height: 65px !important;
                }
    
                .list-card__body {
                    padding-left: 10px !important;
                }
    
                .list-card__title {
                    margin-bottom: 10px !important;
                }
    
                .list-card__date {
                    padding-top: 0 !important;
                }
            }
    
            @media all and (device-width: 768px) and (device-height: 1024px) and (orientation:landscape) {
                .ribbon-mobile {
                    line-height: 1.3 !important;
                }
    
                .ribbon-mobile__text {
                    padding: 0 !important;
                }
            }
    
            @media all and (device-width: 768px) and (device-height: 1024px) and (orientation:portrait) {
                .ribbon-mobile {
                    line-height: 1.3 !important;
                }
    
                .ribbon-mobile__text {
                    padding: 0 !important;
                }
            }
    
            @media screen and (min-device-height:480px) and (max-device-height:568px),
            (min-device-width : 375px) and (max-device-width : 667px) and (-webkit-min-device-pixel-ratio : 2),
            (min-device-width : 414px) and (max-device-width : 736px) and (-webkit-min-device-pixel-ratio : 3) {
    
                .hide_for_iphone {
                    display: none !important;
                }
    
                .passbook {
                    width: auto !important;
                    height: auto !important;
                    line-height: auto !important;
                    visibility: visible !important;
                    display: block !important;
                    max-height: none !important;
                    overflow: visible !important;
                    float: none !important;
                    text-indent: 0 !important;
                    font-size: inherit !important;
                }
            }
        </style>
    </head>
    
    <body border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" bgcolor="#F7F7F7" style="margin: 0;">
        <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" bgcolor="#F7F7F7">
            <tbody>
                <tr>
                    <td>
                        <table width="600" align="center" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF">
                            <tbody>
                                <tr>
                                    <td>
                                        <table class="content" align="center" cellpadding="0" cellspacing="0" border="0"
                                            bgcolor="#F7F7F7" style="width: 600px; max-width: 600px;">
                                            <tbody>
                                                <tr>
                                                    <td colspan="2" style="background: #fff; border-radius: 8px;">
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td
                                                                        style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                                                                    </td>
                                                                </tr>
                                                                <tr class="">
                                                                    <td class="grid__col"
                                                                        style="font-family: 'Helvetica neue', Helvetica, arial, sans-serif; padding: 32px 40px; ">
                                                                        <h2
                                                                            style="color: #404040; font-weight: 300; margin: 0 0 12px 0; font-size: 20px; line-height: 30px; font-family: 'Helvetica neue', Helvetica, arial, sans-serif; ">
                                                                            Hi {USER_NAME},
                                                                        </h2>
                                                                        <p style="color: #666666; font-weight: 400; font-size: 15px; line-height: 21px; font-family: 'Helvetica neue', Helvetica, arial, sans-serif; "
                                                                            class="">Your booking has been confirmed. Please
                                                                            review the details of your booking.</p>
                                                                        <table width="100%" border="2" cellspacing="0"
                                                                            cellpadding="0"
                                                                            style="margin-top: 12px; margin-bottom: 12px; margin: 24px 0; color: #666666; font-weight: 400; font-size: 15px; line-height: 21px; font-family: 'Helvetica neue', Helvetica, arial, sans-serif;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td
                                                                                        style="padding:20px 20px 0px ; font-weight:700; font-size: 25px; ">
                                                                                        Booking Details <br>
                                                                                        <p
                                                                                            style="padding-top:0px; font-weight:700; font-size: 12px; ">
                                                                                            Booking Confirmation
                                                                                            Code:{BOOKING_TRNNO}
                                                                                        </p>
                                                                                        <p
                                                                                        style="padding-top:0px; font-weight:700; font-size: 12px; ">
                                                                                        Start Date: {START_DATE} , Start
                                                                                        Time: {START_TIME}
                                                                                        </p>
                                                                                    </td>
                                                                                </tr>
                                                                                
                                                                                <tr>
                                                                                    <td>
                                                                                        <table
                                                                                            style="width: 100%;!important">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        style="padding:20px 20px 0px 20px ; font-weight:700; font-size: 18px; ">
                                                                                                        Payment Details</td>
                                                                                                </tr>
                                                                                                {POOJA_DETAILS}
                                                                                                <tr>
                                                                                                <td colspan="3"></td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        style=" colspan=2; padding:5px 20px 10px 20px ; font-weight:700; font-size: 14px; color:#000">
                                                                                                        Grand Total </td>
                                                                                                    <td></td>
                                                                                                    <td
                                                                                                        style=" padding:5px 20px 10px 30px ; font-weight:700; font-size: 14px; color:#000;">
                                                                                                        {TOTAL}</td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        style=" colspan=2; padding:5px 20px 10px 20px ; font-weight:700; font-size: 14px;">
                                                                                                        Payment Mode </td>
                                                                                                    <td></td>
                                                                                                    <td
                                                                                                        style=" padding:5px 20px 10px 30px ; font-weight:700; font-size: 14px; ">
                                                                                                        Online</td>
                                                                                                </tr>
    
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
    
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        <table
                                                                                            style="width: 100%;!important">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        style="padding:20px 20px 0px 20px ; font-weight:700; font-size: 18px; ">
                                                                                                        Guest Details</td>
                                                                                                </tr>
    
    
                                                                                                <tr>
                                                                                                    <td
                                                                                                        style=" colspan=2; padding:20px 20px 5px 20px ; font-weight:300; font-size: 14px;">
                                                                                                        Mr. {HUSBAND_NAME}
                                                                                                    </td>
                                                                                                    <td></td>
                                                                                                    <td
                                                                                                        style="  padding:20px 20px 5px 30px ; font-weight:300; font-size: 14px;">
                                                                                                        {CONTACT_NO}</td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        style=" colspan=2; padding:5px 20px 10px 20px ; font-weight:400; font-size: 14px;">
                                                                                                        Mrs. {WIFE_NAME}
                                                                                                        </td>
                                                                                                    <td></td>
                                                                                                    <td
                                                                                                        style="  padding:5px 20px 10px 30px ; font-weight:400; font-size: 14px;">
                                                                                                        </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        style=" colspan=2; padding:20px 20px 5px 20px ; font-weight:700; font-size: 14px;">
    
                                                                                                    </td>
                                                                                                </tr>
    
                                                                                                <tr>
                                                                                                    <td
                                                                                                        style=" colspan=2; padding:20px 20px 5px 20px ; font-weight:300; font-size: 14px;">
                                                                                                    </td>
                                                                                                    <td></td>
                                                                                                    <td
                                                                                                        style="  padding:20px 20px 5px 30px ; font-weight:300; font-size: 14px;">
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        style=" colspan=2; padding:5px 20px 10px 20px ; font-weight:400; font-size: 14px;">
                                                                                                    </td>
                                                                                                    <td></td>
                                                                                                    <td
                                                                                                        style="  padding:5px 20px 10px 30px ; font-weight:400; font-size: 14px;">
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
    
                                                                            </tbody>
                                                                        </table>
                                                                        <p style="color: #666666; font-weight: 400; font-size: 15px; line-height: 21px; font-family: 'Helvetica neue', Helvetica, arial, sans-serif; "
                                                                            class="">Hope you enjoyed the booking experience
                                                                            and will like the stay too.</p>
                                                                        <p style="color: #666666; font-weight: 400; font-size: 17px; line-height: 24px; font-family: 'Helvetica neue', Helvetica, arial, sans-serif; margin-bottom: 6px; margin-top: 24px;"
                                                                            class="">Thank you, </p>
                                                                        <p
                                                                            style="color: #666666; font-weight: 400; font-size: 17px;  font-family: 'Helvetica neue', Helvetica, arial, sans-serif; margin-bottom: 6px; margin-top: 10px;">
                                                                            Management</p>
                                                                    </td>
                                                                </tr>
    
    
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
    
    
                    </td>
                </tr>
            </tbody>
        </table>
    </body>
    
    </html>
    `;
    htmlBody = htmlBody.replace('{USER_NAME}', booking.husbandName);
    htmlBody = htmlBody.replace('{HUSBAND_NAME}', booking.husbandName);
    htmlBody = htmlBody.replace('{WIFE_NAME}', booking.wifeName);
    htmlBody = htmlBody.replace('{BOOKING_TRNNO}', booking.bookingid);
    htmlBody = htmlBody.replace('{START_DATE}', booking.startDate);
    htmlBody = htmlBody.replace('{START_TIME}', booking.startTime);

    let poojaDetailsBody = '';
    let poojaPrice = 0;
    booking.participantPoojas.forEach(a => {
        poojaPrice = 0;
        poojaPrice = a.poojaPrice;
        poojaDetailsBody += `<tr>
<td
    style=" colspan=2; padding:20px 20px 5px 20px ; font-weight:300; font-size: 14px;">
    ${(a.poojaName == 'savana' ? a.poojaName + '(' + booking.no_of_savana + ' Nos)' : a.poojaName)}
</td>
<td></td>
<td
    style="  padding:20px 20px 5px 30px ; font-weight:300; font-size: 14px;">
    ${poojaPrice}</td>
</tr>`;
    });

    htmlBody = htmlBody.replace('{POOJA_DETAILS}', poojaDetailsBody);
    htmlBody = htmlBody.replace('{TOTAL}', booking.totalAmount);
    htmlBody = htmlBody.replace('{CONTACT_NO}', booking.contactNo);



    const mailTransport = nodemailer.createTransport({
        host: config.mailConfig.host,
        secure: true,
        secureConnection: false, // TLS requires secureConnection to be false
        tls: {
            ciphers: 'SSLv3'
        },
        requireTLS: true,
        port: 465,
        debug: true,
        auth: {
            user: config.mailConfig.user,
            pass: config.mailConfig.password
        }
    });

    const mailOptions = {
        from: config.mailConfig.user,
        to: toAddress,
        subject: `Payment confirmation`,
        html: htmlBody
    };
    mailTransport.sendMail(mailOptions).then(() => {
        console.log('Email sent successfully');
    }).catch((err) => {
        console.log('Failed to send email');
        console.error(err);
    });
}


module.exports = {
    getPooja,
    sendMail,
    contactUs
}