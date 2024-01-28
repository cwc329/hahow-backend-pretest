import express from 'express';
import morgan from 'morgan';
import * as config from '#configs';
import { heroes } from '#routes';

const { logFormat } = config.app;

const app = express();

app.use(morgan(logFormat));

app.use(heroes);

export default app;
