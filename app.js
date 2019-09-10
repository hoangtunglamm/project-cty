const express = require('express');
const port = 3000;
const app = express();
const sql = require('mssql')
const bodyParser = require('body-parser')
const session = require('express-session');
const passport = require('passport')
const mongoose = require('mongoose')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
     }
  }))
  app.set('views', __dirname+'/views');
  app.set('view engine', 'ejs');
  mongoose.connect('mongodb://localhost:27017/testsomeshit', {useNewUrlParser: true}, err => {
    if (err) console.error(err);
    else console.log("Database connect successful");
  });
const messageRouter = require('./router/message.router')

const loginRouter = require('./router/login.router')


const passportMW = require('./middlewares/passport.middleware')
const connectMW = require('./middlewares/connect.middleware')


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: false }));
app.use(passport.initialize());
app.use(passport.session())


app.use('/message',connectMW.connect, messageRouter)

app.use('/login', loginRouter)


app.get('/sucess', (req, res) =>{
    res.send('sucess')
})
app.get('/errors', (req, res) =>{
    res.send('error')
})

app.get('/secret', passportMW.checkAuthenticated,(req, res) =>{
    res.send('this is a secret')
})

sql.on('error', err => {
    console.log('Cannot connect database')
})


app.listen(port, (err) =>{
    if(err) console.log(err)
    else console.log('Server is running on port '+port)
})