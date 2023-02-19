const path = require("path");
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "cloudsoftpros@gmail.com",
        pass: "bjyiqqoyqhlhikbk",
    },
    logger: true,
    debug: true,
});

const sendMailThroughMailgun = (body) => {
    const message =
        "<p>Kindly verify yourself at Bin Hamooda App.</p><br><p>Your One Time Password (OTP) is " +
        body.token +
        ". Kindly do not disclose your OTP to others for your own security.</p> ";
    const data = {
        from: "cloudsoftpros@gmail.com",
        to: body.email,
        subject: "Account Verification at Bin Hamooda App",
        html: message,
    };
    transporter.sendMail(data, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

const sendInspectionFromMailgun = (body) => {

    const message =
        "<h1>INSPECTION REQUEST RECEIVED FROM Bin Hamooda APP </h1><br> " +
        "<table border='1' > " +
        " <tr> <th>Title</th> <th>Value</th> </tr> " +
        ` <tr> <td>VIN</td> <td>${body.vin}</td>   </tr> ` +
        ` <tr> <td>OLDER THEN 1980</td> <td>${body.olderThan1980}</td>   </tr> ` +
        ` <tr> <td>STOCK NUMBER</td> <td>${body.stockNumber}</td>   </tr> ` +
        ` <tr> <td>DAYS ON LOT</td> <td>${body.daysOnLot}</td>   </tr> ` +
        ` <tr> <td>INSPECTION LOCATION</td> <td>${body.inspectionLocation}</td>   </tr> ` +
        ` <tr> <td>YEAR</td> <td>${body.year}</td>   </tr> ` +
        ` <tr> <td>MAKE</td> <td>${body.make}</td>   </tr> ` +
        ` <tr> <td>TRIM</td> <td>${body.trim}</td>   </tr> ` +
        ` <tr> <td>MODEL</td> <td>${body.model}</td>   </tr> ` +
        ` <tr> <td>DRIVE TRAIN</td> <td>${body.driveTrain}</td>   </tr> ` +
        ` <tr> <td>TRANSMISSION</td> <td>${body.transmission}</td>   </tr> ` +
        ` <tr> <td>VEHICLE CLASS</td> <td>${body.vehicleClass}</td>   </tr> ` +
        ` <tr> <td>FUEL TYPE</td> <td>${body.fuelType}</td>   </tr> ` +
        ` <tr> <td>ODOMETER</td> <td>${body.odometer}</td>   </tr> ` +
        ` <tr> <td>TRUE MILEAGE</td> <td>${body.trueMileage}</td>   </tr> ` +
        ` <tr> <td>MECHANICAL ISSUES</td> <td>${body.mechanicalIssues}</td>   </tr> ` +
        ` <tr> <td>FRAME DAMAGE</td> <td>${body.frameDamage}</td>   </tr> ` +
        ` <tr> <td>FACTORY EMISSION</td> <td>${body.factoryEmission}</td>   </tr> ` +
        ` <tr> <td>DRIVABILITY ISSUES</td> <td>${body.drivabilityIssues}</td>   </tr> ` +
        ` <tr> <td>EXPECTED RESERVE PRICE</td> <td>${body.expectedReservePrice}</td>   </tr> ` +
        ` <tr> <td>TEST DRIVE</td> <td>${body.testDrive}</td>   </tr> ` +
        ` <tr> <td>AVAILABLE FOR INSPECTION</td> <td>${body.availableForInspection}</td>   </tr> ` +
        ` <tr> <td>SELLING</td> <td>${body.selling}</td>   </tr> ` +
        ` <tr> <td>BRANDED</td> <td>${body.branded}</td>   </tr> ` +
        ` <tr> <td>TITLE</td> <td>${body.title}</td>   </tr> ` +
        "</table>";

    const data = {
        from: "cloudsoftpros@gmail.com",
        to: 'info@profusionventures.com',
        subject: "Inspection request from Bin Hamooda app.",
        html: message,
    };

    transporter.sendMail(data, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

const sendMessagetoFollowers = (emails, dealerName) => {
    console.log(emails)
    const message =
        "<h3> " + dealerName + " has changed his details. </h3><br> " +
        "<p> " + dealerName + " has just changed their details from Bin Hamooda platform. You can see those changes from Bin Hamooda app.</p>";
    var mailOptions = {
        from: 'cloudsoftpros@gmail.com',
        to: emails,
        subject: 'Bin Hamooda App: Dealer has changed his information',
        html: message
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

const changePasswordThroughMailgun = (body) => {
    const message =
        "<p>Your One Time Password (OTP) is " +
        body.token +
        ". Kindly do not disclose your OTP to others for your own security. If you didnt request a password change then kindly ignore this message.</p> ";

    const data = {
        from: "cloudsoftpros@gmail.com",
        to: body.email,
        subject: "Account Verification at Politic",
        html: message,
    };

    transporter.sendMail(data, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = {
    sendMailThroughMailgun,
    changePasswordThroughMailgun,
    sendInspectionFromMailgun,
    sendMessagetoFollowers
};