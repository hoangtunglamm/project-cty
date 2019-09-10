const sql = require('mssql')
const session = require('express-session')

async function login(username){
    try {
        let result= await pool.request()
        .input('UserName', sql.VarChar(50), username)
        .execute('spGetUserProfile')
        sql.close()
        return result
    } catch (err) {
        console.log(err)
        sql.close()
    }
}

module.exports = {login}