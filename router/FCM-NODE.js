class sendNotification {
    constructor(Token) {
        this.fs = require('fs');
        this.infor = JSON.parse(this.fs.readFileSync('./infor.json'));

        this.title = null;
        this.icon = null;
        this.Token = Token;
        this.body = this.infor.body;

        this.iosServerKey = this.infor.iosServerKey;
        this.androidServerKey = this.infor.androidServerKey;

        this.message = null;

        this.FCM = require('fcm-node');
        this.fcm = null;
    }

    sendAndroid() {
        this.message = {
            to: this.Token,
            priority: 'normal',
            notification: {
                title: this.title,
                body: this.body,
            },
        };
        this.fcm = new this.FCM(this.androidServerKey);
        this.fcm.send(this.message, (err, response) => {
            if (err) { console.error(err); } else {
                console.log('Successfully sent...');
            }
        });
    }

    sendIOS() {
        this.message = {
            to: this.Token,
            priority: 'normal',
            notification: {
                title: this.title,
                body: this.body,
            },
        };
        this.fcm = new this.FCM(this.iosServerKey);
        this.fcm.send(this.message, (err, response) => {
            if (err) { console.error(err); } else {
                console.log('Successfully sent...');
            }
        });
    }
}