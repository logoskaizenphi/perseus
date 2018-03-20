//const API_AI_TOKEN = '59935d6183d4441fbcfcfab1477539fd';
const API_AI_TOKEN = '11190b2f35244e4db4bb41d75c117bfe';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = 'EAAC3D28oW2wBANUzMWTQqZC37ZBjp7dNzZARnLZAg9fP9JNrrUk6hakk9gA1MRirBmJqTpxqVFQ9QZB51QQ390LetE3XxkPEPGuI4MZCmQj7Kit5o7EQ61jHP819RTZAL2FCRpYpmgdhycqZAbKnaFu759csYpHK6z2xmb4JgiN3igZDZD';
const request = require('request');
const sendTextMessage = (senderId, text) => {
 request({
 url: 'https://graph.facebook.com/v2.6/me/messages',
 qs: { access_token: FACEBOOK_ACCESS_TOKEN },
 method: 'POST',
 json: {
 recipient: { id: senderId },
 message: { text },
 }
 });
};
module.exports = (event) => {
 const senderId = event.sender.id;
 const message = event.message.text;
const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'crowdbotics_bot'});
apiaiSession.on('response', (response) => {
 const result = response.result.fulfillment.speech;
sendTextMessage(senderId, result);
 });
apiaiSession.on('error', error => console.log(error));
 apiaiSession.end();
};