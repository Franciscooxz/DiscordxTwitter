require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');
const { Client, GatewayIntentBits } = require('discord.js');
const winston = require('winston');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'discord-twitter-bot' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

const twitterClient = new TwitterApi(process.env.BEARER_TOKEN);

async function sendMessage(tweet) {
  const url = `https://twitter.com/user/status/${tweet.id}`;
  const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID);
  try {
    await channel.send(`${process.env.CHANNEL_MESSAGE} ${url}`);
  } catch (error) {
    logger.error(`Error sending message to Discord: ${error}`);
  }
}

async function setupTwitterStream() {
  try {
    const rules = await twitterClient.v2.streamRules();
    if (rules.data?.length) {
      await twitterClient.v2.updateStreamRules({
        delete: {
          ids: rules.data.map(rule => rule.id)
        }
      });
    }

    await twitterClient.v2.updateStreamRules({
      add: [
        { value: `from:${process.env.TWITTER_USER_NAME}` }
      ]
    });

    const stream = twitterClient.v2.searchStream({
      'tweet.fields': ['author_id', 'conversation_id'],
      'expansions': ['author_id', 'referenced_tweets.id'],
      'media.fields': ['url']
    });

    stream.autoReconnect = true;

    stream.on(
      'data',
      async (data) => await sendMessage(data.data)
    );

    stream.on('error', (error) => {
      logger.error(`Twitter stream error: ${error}`);
    });

  } catch (error) {
    logger.error(`Error setting up Twitter stream: ${error}`);
  }
}

client.on('ready', async () => {
  logger.info(`Discord client ready as ${client.user.tag}`);
  await setupTwitterStream();
});

client.login(process.env.DISCORD_TOKEN);