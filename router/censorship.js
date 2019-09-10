var Connection = require('tedious').Connection;  
var config = {  
    server: '192.168.1.33',  //update me
    authentication: {
        type: 'default',
        options: {
            userName: 'sa', //update me
            password: 'Tam8tam8@'  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'MasterDB'  //update me
    }
};  
var connection = new Connection(config);  
connection.on('connect', function(err) {  
    // If no error, then good to proceed.  
    if(err) throw err;
    console.log("Connected");
    setInterval(() => {
        executeStatement1(); 
    }, 1000*60*5);   
});  

var Request = require('tedious').Request  
var TYPES = require('tedious').TYPES;  

function executeStatement1() {  
    let request = new Request("select * from InappropriateUserMediumFlags where status=1;", function(err) {  
     if (err) {  
        console.log(err);
    }  
    });  

    request.on('row', function(columns) {  
        if(columns.length >0){
        columns.forEach(function(column) {  
          let request1 = new Request(`update UserPosts set status=0 where id=${column.value.id}`,(err)=>{
              if(err) console.error(err);
          });
          let request2 = new Request(`update InappropriateUserMediumFlags set status=0 where id=${column.value.id}`,(err)=>{
              if(err) console.error(err);
          })
        });  
    }

    });       

    connection.execSql(request);
}  
