const sql = require('mssql')

async function userReport(SenderUserName, RecipientUserId, Content){
    
    try {
       
        let result2 = await pool.request()
        .input('SenderUserName', sql.VarChar(100), SenderUserName)
        .input('RecipientUserId', sql.Int, RecipientUserId)
        .input('Content', sql.VarChar(300), Content )
        .output('MessageId', sql.VarChar(50))
        .execute('spInsertNewMessage')
        sql.close()
       return result2
    } catch (err) {
        console.log(err)
    }
}

module.exports = {userReport}