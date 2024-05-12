import { Terminal } from '@xterm/xterm';
import { useEffect, useRef } from 'react';
import '@xterm/xterm/css/xterm.css';
import socket from './api/socket';
import './terminal.css';

const term = new Terminal();

function Xterminalsocket() {
	const terminalRef = useRef(null);

	useEffect(() => {
		socket.on('data', (data) => {
			term.write(data);
		});

		return () => {
			socket.disconnect();
		};
	}, [socket]);

	useEffect(() => {
		if (!terminalRef.current) return;

		term.open(terminalRef.current);
		term.write('Hello, world!\r\n');

		term.onKey((e) => {
			socket.emit('command', e.key);
		});

		return () => {
			term.dispose();
		};
	}, [terminalRef, socket]);

	return <div ref={terminalRef}></div>;
}

export default Xterminalsocket;
