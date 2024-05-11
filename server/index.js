import http from "http";
import { spawn } from "node-pty";
import { createServer } from "./server.js";
import { Server as SocketIOServer } from "socket.io";
import fs from "fs";

const port = process.env.PORT || 3000;
const app = createServer();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: "*",
    },
});
await fs.writeFileSync(process.cwd() + "/public/" + Math.random() + ".txt", "adfkjalksdfj jsajkfsjkdf");
app.get("/", (req, res) => {
    const listFIleNames = fs.readdirSync(process.cwd() + "/public/");
    res.send(listFIleNames);
})

io.on("connection", (socket) => {
    console.log("User Connected")
    const ptyProcess = spawn("bash", [], {
        name: "xterm-color",
        cwd: process.env.INIT_CWD,
        env: process.env,
    });

    socket.on("command", (data) => {
        ptyProcess.write(data);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });

    ptyProcess.onData((data) => {
        socket.emit("data", data);
    });
});

server.listen(port, () => {
    console.log(`API running on port ${port}`);
});