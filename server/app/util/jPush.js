const JPush = require('jpush-async').JPushAsync;
const client = JPush.buildClient(
    'appkey',
    'masterkey'
); 

module.exports = (type, title, content = '', extra = {}) => {
    client.push().setPlatform(JPush.ALL)
        .setAudience(JPush.ALL)
        .setNotification(type, JPush.android(content, title, 1, extra))
        .send(function (err, res) {
            if (err) {
                if (err instanceof JPush.APIConnectionError) {
                    console.log(err.message)
                } else if (err instanceof JPush.APIRequestError) {
                    console.log(err.message)
                }
            } else {
                console.log('Sendno: ' + res.sendno)
                console.log('Msg_id: ' + res.msg_id)
            }
        });
}