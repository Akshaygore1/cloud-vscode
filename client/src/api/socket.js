
import socketIO from 'socket.io-client';

const MAX_RETRIES = 5;

const socket = socketIO.connect('http://localhost:3000', {
    reconnectionAttempts: MAX_RETRIES,
});

export default socket