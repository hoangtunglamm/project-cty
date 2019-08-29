let Connection = require('tedious').Connection;
var Request = require("tedious").Request;

let config = {
    server: '',
    options: { encrypt: true },
    authentication: {
        type: "default",
        options: {
            userName: "",
            password: "",
        }
    }
};

let connection = new Connection(config);

setInterval(() => {
    connection.on('connect', (err) => {
        if (err) console.error(err);
        let request = new Request('select * from table_name where status=1', (err, count, rows) => {
            if (count == 0) {
                console.log('notthing');
            } else {
                rows.forEach(item => {
                    let request1 = new Request(`update table_name set status=0 where id=${item.id} `, (err) => {
                        if (err) console.error(err);
                    });
                    let request2 = new Request(`update table_name set status=0 where id=${item.id}`, (err) => {
                        if (err) console.error(err);
                    });
                });
            }
        });
    });
}, 1000 * 60 * 5);