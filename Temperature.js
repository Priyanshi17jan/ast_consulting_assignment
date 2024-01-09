var TelegramBot = require("node-telegram-bot-api");
var request = require("request");

// Token obtained from bot father
var token = "6843800524:AAH1DjzJOHzjE-gRINuy3xo9Dfkqx2PvERE";

var bot = new TelegramBot(token, { polling: true });

// Create a bot that uses 'polling' to
// fetch new updates
bot.on("polling_error", (err) => console.log(err));

const schedule = require("node-schedule");

const rule = new schedule.RecurrenceRule();

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Welcome to the Weather Bot! I will send you the temperature in Delhi every hour."
  );
});

bot.onText(/\/delhi/, (msg) => {
  request(
    "http://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=f1d97ac05af11ce7546f05bdb9dd2a68",
    (error, response, body) => {
      const data = JSON.parse(body);
      var temperature = data.main.temp;
      temperature -= 273;

      bot.sendMessage(
        msg.chat.id,
        `The temperature in Delhi is ${temperature}`
      );
    }
  );
});

const job = schedule.scheduleJob("42 * * * *", (msg) => {
  request(
    "http://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=f1d97ac05af11ce7546f05bdb9dd2a68",
    (error, response, body) => {
      const data = JSON.parse(body);
      var temperature = data.main.temp;
      temperature -= 273;

      bot.sendMessage(
        msg.chat.id,
        `The temperature in Delhi is ${temperature}`
      );
    }
  );
});
