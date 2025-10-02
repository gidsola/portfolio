import 'dotenv/config';
import { readFile } from 'fs/promises';
import { OnSocketBanner } from './banners.mjs';
import NetService from 'netservice';
import logger from './logger.mjs';
import readline from 'readline';
import chalk from 'chalk';

try {
  // startup check, bail if no version info
  OnSocketBanner(await readFile('.version', { encoding: 'utf8' }));

  const netservice = new NetService(process.env.DOMAIN);
  netservice.on('ready', async () => logger().info(chalk.greenBright('<< Ready >>')));

  readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
    .on('line', async (input) => {
      if (input.trim().toLowerCase() === 'shutdown') {
        await gracefulShutdown(netservice);
      }
    });

  process.on('SIGINT', async () => { await gracefulShutdown(netservice) });
  process.on('SIGTERM', async () => { await gracefulShutdown(netservice) });

} catch (e) {
  console.error(e);
  logger().error('Construction Error:', e);
};


/**
 * @param {NetService} NetService
 * 
 * @private
 */
async function gracefulShutdown(NetService) {
  try {
    NetService.Service.closeAllConnections();
    await NetService.NextServer.close();
    logger().info(chalk.yellowBright('<< NextServer Offline >>'));

    NetService.Service.close(() => {
      logger().info(chalk.greenBright('<< Exiting Normally >>'));
      process.exit(0);
    });

  }
  catch (e) {
    logger().error('Error closing NetService:', e);
    NetService.Service.close(() => {
      logger().info(chalk.redBright('Exiting with code: 1 ->>'));
      process.exit(1);
    });
  };

  // force close connected clients
  setTimeout(() => {
    logger().info(chalk.yellowBright('Force closing connections..'));
    process.exit(0);
  }, 5000);
};
