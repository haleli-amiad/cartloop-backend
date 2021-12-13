const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const logger = require('./services/logger.service')
const messages = ['Britney Rules!', 'What if god was one of us?', 'Sure thing, honey 😎', 'I can make it work!', 'I want to adopt a raccoon 🦝', 'How much would you pay for it?', 'Gimme pizza please! 🍕', 'I\'m just a Bot 🤷‍♀️']

const getRandomMessage = () => {
    return messages[Math.floor(Math.random() * messages.length)]
}

io.on("connection", socket => {
    socket.emit("message from server", { body: 'The Global Plastics Alliance Announces fourfold increase in Projects to Combat Marine Litter', id: 'server', name: 'Jane Cooper' });
    socket.emit("id", socket.id);
    socket.on("debounce", e => {
        setTimeout(() => {
            socket.emit("message from server", { body: getRandomMessage(), id: 'server', name: 'Jane Cooper' });
        }, 2000);
    })
    socket.on("send message", body => {
        io.emit("message", body)
    })
})

const port = process.env.PORT || 3030;
server.listen(port, () => {
    logger.info('Server is running on port: ' + port)
});