require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const axios = require('axios');

(async () => {
  try {
    const response = await axios.get('https://www.revelstokemountainresort.com/conditions/snow-report')
    let snowReportIndex1 = response.data.indexOf('New Snow');
    let snowReportIndex2 = snowReportIndex1 + 100;
    let looseSnowReportString = response.data.substring(snowReportIndex1, snowReportIndex2);
    let newSnowString = looseSnowReportString.substring(
      looseSnowReportString.lastIndexOf('<strong>') + '<strong>'.length,
      looseSnowReportString.lastIndexOf('</strong>')
    );
    let newSnow = parseInt(newSnowString);
    if (newSnow > 4) {
      let numbers = ['+16474981270', /*'+16479608501'*/];

      numbers.forEach(number => {
        client.messages
          .create({
            body: 'There are ' + newSnow + 'cm of new snow this morning',
            from: '+16262473317',
            to: number
          })
          .then(message => console.log(message));  
      });
    }
  } catch (error) {
    console.log(error.response.body);
  }
})();