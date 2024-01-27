import express from 'express';
import morgan from 'morgan';

import * as config from '#configs';
import { heroes } from '#routes';
import { logger } from '#utils';

const { logFormat, port } = config.app;

const app = express();

app.use(morgan(logFormat));

app.use(heroes);

const main = () => {
  app.listen(port, () => {
    logger.info(`ready on http://localhost:${port}`);
  });
};

main();
