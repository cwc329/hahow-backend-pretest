import * as config from '#configs';
import { logger } from '#utils';
import app from './app';

const { port } = config.app;

const main = () => {
  app.listen(port, () => {
    logger.info(`ready on http://localhost:${port}`);
  });
};

main();
