const nodemailer  = require('nodemailer')
const sql = require('mssql')
const sendMailOder = (mail ) =>{
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		  user: 'lamptit96@gmail.com',
		  pass: 'meyuptrmbhplvsnn'
		}
	  });
	 
	//   let url = `http://localhost:3000/message/do-active/${mail}`
	  const mailOptions = {
		from: 'lamptit96@gmail.com',
		to: mail,
		subject: 'HTLam-project',
		html: `Please click this email to confirm your email: <a href =" http://localhost:3000/message/do-active/${mail}" > http://localhost:3000/message/do-active/${mail}</a>`,
	  };
	  
	  transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		  console.log(error);
		} else {
		  console.log('Email sent: ' + info.response);
		  res.json(req.body)
		}
      });
      sql.close()
}

module.exports = {sendMailOder}