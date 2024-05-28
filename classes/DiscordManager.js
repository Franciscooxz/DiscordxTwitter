'use strict';
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

class DiscordManager extends Client {
  constructor(options = {}) {
    super({ intents: [GatewayIntentBits.Guilds] });
    this.options = options;
  }

  async sendMessage(tweet) {
    const url = `https://twitter.com/user/status/${tweet.id}`;
    try {
      const channel = await this.channels.fetch(process.env.DISCORD_CHANNEL_ID);
      await channel.send(url);
      console.log(`Sent tweet ${url} to Discord channel`);
    } catch (error) {
      console.error(`Error sending message to Discord: ${error}`);
    }
  }
}

const discordManager = new DiscordManager();
discordManager.login(process.env.DISCORD_TOKEN);