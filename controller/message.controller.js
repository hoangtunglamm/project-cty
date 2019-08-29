const config = require('../config')
const sql = require('mssql')
async function getMessage() {
    try {
        let result1 = await pool.request()
            .query('select * from Messages')
        sql.close()    
        return result1
    
    } catch (err) {
        console.log(err)
    }
}

async function addMessage(SenderUserName, RecipientUserId, Content){
    
    try {
       
        let result= await pool.request()
        .input('SenderUserName', sql.VarChar(100), SenderUserName)
        .input('RecipientUserId', sql.Int, RecipientUserId)
        .input('Content', sql.VarChar(300), Content )
        .output('MessageId', sql.VarChar(50))
        .execute('spInsertNewMessage')
        sql.close()
       return result
    } catch (err) {
        console.log(err)
    }
}

async function getActive() {
    try {
        let result = await pool.request()
            .query('select * from AspNetUsers')
        sql.close()    
        return result
    
    } catch (err) {
        console.log(err)
    }
}

async function activeMail(mail){
    try {
        let result = await pool.request()
        .input('UserEmail', sql.VarChar(256), mail)
        .execute('spActivateUserByUserEmail')
        sql.close()    
        return result
    
    } catch (err) {
        console.log(err)
    }
}

module.exports= {getMessage, addMessage, getActive, activeMail}