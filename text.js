let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'support@bubu.com',
        pass: 'BubuSukses1'
    }
});

let mailOptions = {
    from: 'dhimas.hertianto@gmail.com',
    to: 'dhimashertianto@gmail.com',
    subject: 'Sending Email using Nodejs',
    html: '<h1>Welcome</h1><p>That was easy!</p>'
};

transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    console.log('Email sent: ' + info.response);
});