const express = require('express');
router = express.Router();
const authController = require('../controller/auth.controller')
const session = require('express-session')
const sql  = require('mssql')
const passport = require('passport')
require('../passport')(passport)
// router.post('/', async(req, res) =>{
//     let result = await authController.login(req.body.username)
//     if(result){
//         req.session.user = result
//         res.send(result)
//     }
//     else(res.send('wrong username'))

// })

// router.post('/logout', (req, res) =>{
//     req.session.destroy();
//     sql.close()
//     res.redirect('/auth')
// })

router.get('/', (req, res) =>{
    res.render('login')
})
router.post('/',
  passport.authenticate('local', { failureRedirect: '/errors' }),
  function(req, res) {
    res.redirect('/sucess');
  });

module.exports = router