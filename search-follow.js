require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi(process.env.BEARER_TOKEN);

const stream = client.v2.searchStream({
  'tweet.fields': ['entities', 'author_id'],
  'user.fields': ['name', 'username'],
  'expansions': ['author_id'],
});

stream.autoReconnect = true;

stream.on('data', async (tweet) => {
  try {
    const user = tweet.includes.users[0];
    await client.v2.updateUserFollowingByName(user.username, { directlyFollowing: true });
    console.log(`Followed ${user.name} (@${user.username})`);
  } catch (error) {
    console.error(`Error following user: ${error}`);
  }
});

stream.on('error', (error) => {
  console.error(`Twitter stream error: ${error}`);
});