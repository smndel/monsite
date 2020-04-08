let nodemailer = require('nodemailer');
// Middleware pour l'envoi des mails
module.exports = function (request, response, next) {

    request.sendMail = function (from, name, message) {

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'smndelannoy@gmail.com',
          pass: 'leonnoel'
        }
      });

      var mailOptions = {
        from: from,
        to: 'smndelannoy@gmail.com',
        subject: name+' has sent you a message !',
        text: message
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          request.flash('mail', "Your message was not sent. Please contact me by mail at : smndelannoy@gmail.com ")
        } else {
          request.flash('mail', "Your message was sent")
        }
      });
    }
  next()
}