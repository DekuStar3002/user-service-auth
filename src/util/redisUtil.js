const redis = require('redis');
const redisClient = redis.createClient();
redisClient.on("error", (error) => console.error(`Error : ${error}`));

const get = async () => {
  redisClient.connect();
  const token = await redisClient.get('token');
  redisClient.disconnect();
  return token;
}

const set = async (token) => {
  redisClient.connect();
  await redisClient.set('token', token);
  redisClient.disconnect();
}
module.exports = { get, set };