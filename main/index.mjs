
import { readFile } from 'node:fs';
// import { loadContainers, stopAllContainers } from './ContainerMgr.mjs';
import { OnSocketBanner } from './banners.mjs';
import MicroService from './MicroService.mjs';
import logger from './logger.mjs';
import readline from 'readline';
import chalk from 'chalk';

try {
  // startup check, bail if no version file
  readFile('.version', 'utf8', async (e, v) => {
    if (e) throw e;
    // display banner
    OnSocketBanner(v);
  });

  const Service = new MicroService('localhost');
  Service.on('ready', ()=>logger.info("System Online"));

  readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
    .on('line', async (input) => {
      // TODO: add more commands

      // shutdown services including containers
      if (input.trim().toLowerCase() === 'shutdown') {
        await gracefulShutdown(Service);
      }

      // exit without stopping containers
      if (input.trim().toLowerCase() === 'exit') {
        process.exit(0);
      }
    });

  process.on('SIGINT', async () => { await gracefulShutdown(Service) });
  process.on('SIGTERM', async () => { await gracefulShutdown(Service) });

} catch (e) {
  console.error(e);
  logger.error('Construction Error:', e);
};


/**
 * 
 * @param {MicroService} Service
 * 
 * @private
 */
async function gracefulShutdown(Service) {
  try {
    Service.NetService.closeAllConnections();
    await Service.NextServer.close();
    logger.info(chalk.yellowBright('<< Next Offline >>'));

    // await stopAllContainers();
    // logger.info(chalk.yellowBright('<< Containers Offline >>'));

    Service.NetService.close(() => {
      logger.info(chalk.greenBright('<< Exiting Normally >>'));
      process.exit(0);
    });

  }
  catch (e) {
    logger.error('Error closing Next Server:', e);
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
