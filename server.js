const express = require('express');
const bodyParser = require('body-parser')
const exphbs =require ('express-handlebars')
const nodemailer = require('nodemailer')
const path =require('path')
const app = express()

var port = process.env.PORT || 8080;
//view engine set up
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
//static folder
app.use('/public', express.static(path.join(__dirname, 'public')));
//bidy parser
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());
//route
app.get('/',(req, res) =>{
    res.render('contact')
});
app.post('/send', (req, res) =>{
    const output = `
    <p> you have a new request</p>
    <h3> contact details</h3>
    <ul>
    <li>Name: ${req.body.contactName}</li>
    <li>Email: ${req.body.contactEmail}</li>
    <li>Phone: ${req.body.contactPhone}</li>
    <li>:Message ${req.body.contactMessage}</li>

    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "fer0624@gmail.com", // generated ethereal user
            pass: "Bimbo2018!" // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
    });
   

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Nodemailer contact" <fer0624@gmail.com>', // sender address
        to: 'noreply072493@gmail.com', // list of receivers
        subject: 'Contact request ✔', // Subject line
        text: 'Hello', // plain text body
        html: output// html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
      
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.render('contact', {msg:'email has being sent'})
    });
    
})
app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});