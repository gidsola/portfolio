import NetService from 'netservice';
import logger from './logger.mjs';
import chalk from 'chalk';

/**
 * @param {NetService} NetService
 * 
 * @private
 */
export async function gracefulShutdown(NetService) {
  try {
    NetService.Server.closeAllConnections();
    await NetService.NextServer.close();
    logger().info(chalk.yellowBright('<< NextServer Offline >>'));

    NetService.Server.close(() => {
      logger().info(chalk.greenBright('<< Exiting Normally >>'));
      process.exit(0);
    });

  }
  catch (e) {
    logger().error('Error closing NetService:', e);
    NetService.Server.close(() => {
      logger().info(chalk.redBright('Exiting with code: 1 ->>'));
      process.exit(1);
    });
  };

  // force close connected clients
  setTimeout(async () => {
    await NetService.Safety.cleanup();
    logger().info(chalk.yellowBright('Force closing connections..'));
    process.exit(0);
  }, 5000);
};
