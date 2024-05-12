import http from 'http';
import { spawn } from 'node-pty';
import { createServer } from './server.js';
import { Server as SocketIOServer } from 'socket.io';
import { generateFileTree } from './utils.js';
import chokidar from 'chokidar';
import fs from 'fs/promises';
const port = process.env.PORT || 3000;
const app = createServer();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
	cors: {
		origin: '*',
	},
});
app.get('/', (req, res) => {
	res.send('Hello World!');
});

chokidar.watch('./user').on('all', (event, path) => {
	io.emit('file:refresh', path);
});

app.get('/files', async (req, res) => {
	const tree = await generateFileTree(`./user`, 'utf-8');
	res.json(tree);
});

app.get('/files/content', async (req, res) => {
	const path = req.query.path;
	const content = await fs.readFile(`./${path}`, 'utf-8');
	return res.json({ content });
});

io.on('connection', (socket) => {
	console.log('User Connected');

	// Terminal Code
	const ptyProcess = spawn('bash', [], {
		name: 'xterm-color',
		cwd: './user',
	});
	socket.on('command', (data) => {
		ptyProcess.write(data);
	});

	socket.on('disconnect', () => {
		console.log('Client disconnected');
	});

	ptyProcess.onData((data) => {
		socket.emit('data', data);
	});

	socket.emit('file:refresh');

	socket.on('file:change', async ({ path, content }) => {
		await fs.writeFile(`./user${path}`, content);
	});
});

server.listen(port, () => {
	console.log(`API running on port ${port}`);
});
