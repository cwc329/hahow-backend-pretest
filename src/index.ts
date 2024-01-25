import { createServer } from 'node:http';

import express from 'express';
import morgan from 'morgan';

import * as config from '#configs';
import { heroes } from '#routes';
import { logger } from '#utils';

const { logFormat, port } = config.app;

const app    = express();
const server = createServer(app);

app.use(morgan(logFormat));

app.use(heroes);

const main = () => {
  server.listen(port, () => {
    logger.info(`ready on http://localhost:${port}`);
  });
};

main();
