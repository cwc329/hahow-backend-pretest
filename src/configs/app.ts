export const logFormat = process.env.LOG_FORMAT || 'dev';
export const logLevel  = process.env.LOG_LEVEL || 'debug';
export const port      = parseInt(`${process.env.PORT}`, 10) || 3000;
