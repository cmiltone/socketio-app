"use strict";

const redis = require('redis');
const promise = require('bluebird');
// import env = require('node-env-file";

// env("./.env");

// const REDIS_URL = process.env.REDIS_URL;

promise.promisifyAll(redis.RedisClient.prototype);
promise.promisifyAll(redis.Multi.prototype);

exports.client = () => {
    return new Promise((resolve, reject) => {
        let connector = redis.createClient(); // REDIS_URL

        connector.on("error", () => {
            reject("Redis Connection failed");
        });

        connector.on("connect", () => {
            resolve(connector);
        });
    });
};