const express = require('express');
const port = 3000;
const app = express();
const sql = require('mssql')
const bodyParser = require('body-parser')
const session = require('express-session');


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
     }
  }))

const messageRouter = require('./router/message.router')
const reportRouter = require('./router/report.router')
const authRouter = require('./router/auth.router')



const connectMW = require('./middlewares/connect.middleware')
const authMW = require('./middlewares/auth.middleware')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: false }));


app.use('/message',connectMW.connect, messageRouter)
app.use('/report', connectMW.connect, reportRouter)
app.use('/auth', connectMW.connect, authRouter)

app.use('/', authMW.authorize, (req, res) =>{
    res.send('home')
} )

sql.on('error', err => {
    console.log('Cannot connect database')
})


app.listen(port, (err) =>{
    if(err) console.log(err)
    else console.log('Server is running on port '+port)
})