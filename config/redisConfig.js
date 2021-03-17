const redis = require("redis");

const redis_port = process.env.REDIS_URL || 6379;

const redis_client = redis.createClient(redis_port);

module.exports = redis_client;