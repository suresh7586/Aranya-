const API_AI_TOKEN = '1700e325571d4f2993ae086dd7d1f39b';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = 'EAADcCNh6QzgBAIKMWT1i6cp5qAGZA0Abfrg5yUH9JLLHjwZCmtA2t1jywAOwtF9vF9S01okORlAFgqzpBosEPX8YOzZBJC5N8ygrqI7WSIpfohZCPMmv89U1HpnQRpTGB0jehNu5Qv6VCe8DoKqZC5NoJ2tZBDLpMANE8q0cTWjgZDZD';
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