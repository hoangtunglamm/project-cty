const express = require('express');
router = express.Router();

const sql = require('mssql')
const messageController = require('../controller/message.controller')
const sendMailController = require('../controller/sendmail')

router.get('/', async function(req, res) {
    let result = await messageController.getMessage()
    res.send(result)
 })

router.post('/', async function(req, res){
    let SenderUserName = req.body.SenderUserName;
    let RecipientUserId = req.body.RecipientUserId;
    let Content = req.body.Content;
    let result = await messageController.addMessage(SenderUserName, RecipientUserId, Content)
    res.send(result)
})

router.post('/sendmail', (req, res)=>{
    let mail = req.body.mail    
    sendMailController.sendMailOder(mail)
    res.send('Mail send!')
})

router.get('/active', async(req, res) =>{
    let result = await messageController.getActive()
    res.send(result)
})

router.get('/do-active/:mail', async(req, res) =>{
    let result = await messageController.activeMail(req.params.mail)
    res.send(result)

})

module.exports = router