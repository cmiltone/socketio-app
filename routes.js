
"use strict";

const { Router } = require('express');
const { client } = require('./lib/redis');
const { addMessage } = require('./lib/functions');

const router = Router();


exports.createMessage = router.post("/message", (req, res) => {
    let msg = {
        text: req.body.text,
        sender: req.body.sender
    };

    console.log('adding msg=>', req.body);

    client().then(
        client => {
            client.publish("chatMessages", JSON.stringify(msg));

            addMessage(JSON.stringify(msg)).then(
                () => {
                    res.send({
                        status: 200,
                        message: "Message sent"
                    });
                },
                err => {
                    console.log(err);
                }
            );
        },
        err => {
            console.log(err);
        }
    );
});
