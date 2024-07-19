const { Telegraf } = require('telegraf');
const startAction = require('./actions/start')

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const eventBody = '';

bot.start(ctx => {
  return startAction(ctx)
})

exports.handler = async event => {
  try {
    if (process.env.isLocal) {
      event.body = eventBody;
    } else {
      console.log({event: JSON.stringify(event)});
    }

    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 400, body: '' };
  } catch (e) {
    console.log(e);
    return { statusCode: 400, body: 'This endpoint is meant for bot and telegram communication' };
  }

}