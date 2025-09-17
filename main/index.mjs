
import { readFile } from 'fs/promises';
import { OnSocketBanner } from './banners.mjs';
import Mongo from './mongodb/MongoConnect.mjs';
import MicroService from './MicroService.mjs';
import logger from './logger.mjs';
import readline from 'readline';
import chalk from 'chalk';

try {
  // startup check, bail if no version info
  const mongo = new Mongo("mongodb://localhost:27017");// use for version info. ::nyi
  OnSocketBanner(await readFile('.version', { encoding: 'utf8' }));

  const service = new MicroService('localhost');
  service.on('ready', () => logger.info("    System Ready"));

  readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
    .on('line', async (input) => {
      if (input.trim().toLowerCase() === 'shutdown') {
        await gracefulShutdown(service);
      }
    });

  process.on('SIGINT', async () => { await gracefulShutdown(service) });
  process.on('SIGTERM', async () => { await gracefulShutdown(service) });

} catch (e) {
  console.error(e);
  logger.error('Construction Error:', e);
};


/**
 * @param {MicroService} Service
 * 
 * @private
 */
async function gracefulShutdown(Service) {
  try {
    Service.NetService.closeAllConnections();
    await Service.NextServer.close();
    logger.info(chalk.yellowBright('<< NetService Offline >>'));

    Service.NetService.close(() => {
      logger.info(chalk.greenBright('<< Exiting Normally >>'));
      process.exit(0);
    });

  }
  catch (e) {
    logger.error('Error closing NetService:', e);
    Service.NetService.close(() => {
      logger.info(chalk.redBright('Exiting with code: 1 ->>'));
      process.exit(1);
    });
  };

  // force close connected clients
  setTimeout(() => {
    logger.info(chalk.yellowBright('Force closing connections..'));
    process.exit(0);
  }, 10000);
};
