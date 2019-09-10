const sql = require('mssql');
let config = {
    server: '192.168.1.33',
    database: 'MasterDB',
    user: "sa",
    password: 'Tam8tam8@',
    options: { encrypt: true },
};
sql.connect(config, (err) => {
    if (err) console.error(err);
    let request = new sql.Request();
    setInterval(() => {
        request.query('select * from InappropriateUserMediumFlags where status=1', (err, recordset) => {
            if (err) console.error(err);
            recordset.recordset.forEach(item => {
                request.query(`update UserProfiles set status=0 where id=${item.id}`);
                request.query(`update InappropriateUserMediumFlags set status=0`);
            });
        });
    }, 1000 * 60 * 5);
});