
"use strict";

const { client } = require('./redis');

exports.fetchMessages = () => {
    return new Promise((resolve, reject) => {
        client().then(
            res => {
                res.lrangeAsync("messages", 0, -1).then(
                    messages => {
                        resolve(messages);
                    },
                    err => {
                        reject(err);
                    }
                );
            },
            err => {
                reject("Redis connection failed: " + err);
            }
        );
    });
};

exports.addMessage = message => {
    return new Promise((resolve, reject) => {
        client().then(
            res => {
                res
                    .multi()
                    .rpush("messages", message)
                    .execAsync()
                    .then(
                        res => {
                            resolve(res);
                        },
                        err => {
                            reject(err);
                        }
                    );
            },
            err => {
                reject("Redis connection failed: " + err);
            }
        );
    });
};

exports.fetchActiveUsers = () => {
    return new Promise((resolve, reject) => {
        client().then(
            res => {
                res.smembersAsync("users").then(
                    users => {
                        resolve(users);
                    },
                    err => {
                        reject(err);
                    }
                );
            },
            err => {
                reject("Redis connection failed: " + err);
            }
        );
    });
};

exports.addActiveUser = user => {
    return new Promise((resolve, reject) => {
        client().then(
            res => {
                res
                    .multi()
                    .sadd("users", user)
                    .execAsync()
                    .then(
                        res => {
                            if (res[0] === 1) {
                                resolve("User added");
                            }

                            reject("User already in list");
                        },
                        err => {
                            reject(err);
                        }
                    );
            },
            err => {
                reject("Redis connection failed: " + err);
            }
        );
    });
};

exports.removeActiveUser = user => {
    return new Promise((resolve, reject) => {
        client().then(
            res => {
                res
                    .multi()
                    .srem("users", user)
                    .execAsync()
                    .then(
                        res => {
                            if (res === 1) {
                                resolve("User removed");
                            }
                            reject("User is not in list");
                        },
                        err => {
                            reject(err);
                        }
                    );
            },
            err => {
                reject("Redis connection failed: " + err);
            }
        );
    });
};