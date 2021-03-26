require("../../config/connection.js");

const socketio = require("socket.io");
const redis = require("redis");
const client = redis.createClient();
const jwt = require("jsonwebtoken");

let io = null;

const startSocket = (app) => {
    console.log("Starting socket");

    io = socketio(app, { pingInterval: 5000 });

    io.on("connection", function (socket) {
        let token = socket.handshake.query.token;

        jwt.verify(token, process.env.jwt_secret, (err, decoded) => {
            if (err) {
                console.log(err);
            } else {
                let email = decoded.email;
                
                client.hset(email, "socketId", socket.id, redis.print);

                io.to(socket.id).emit("connectionStatus", "Success");

                socket.on("disconnect", function () {
                    client.hdel(email, "socketId", redis.print);
                    console.log(socket.id, "Removed");
                });
            }
        });
    });
};

const getSocket = () => io;

module.exports = {
    startSocket,
    getSocket,
};
