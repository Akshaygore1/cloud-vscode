import pkg from 'body-parser';
const { json, urlencoded } = pkg;
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

export const createServer = () => {
	const app = express();

	app
		.disable('x-powered-by')
		.use(morgan('dev'))
		.use(urlencoded({ extended: true }))
		.use(json())
		.use(cors({ origin: 'http://localhost:5173' }))
		.get('/message/:name', (req, res) => {
			return res.json({ message: `hello ${req.params.name}` });
		})
		.get('/status', (_, res) => {
			return res.json({ ok: true });
		});

	return app;
};
