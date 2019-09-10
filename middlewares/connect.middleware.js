const sql = require('mssql');
const config = require('../config')
const connect = async(req, res, next) => {
        global.pool = await sql.connect(config)
        console.log('Database connected!')
        next()
  };
  
module.exports = { connect };
 