import 'dotenv/config';
import { readFile } from 'fs/promises';
import { OnSocketBanner } from './banners.mjs';
import NetService from 'netservice';
import logger from './logger.mjs';
import readline from 'readline';
import chalk from 'chalk';
import { gracefulShutdown } from './helpers.mjs';

try {
  // startup check, bail if no version info
  OnSocketBanner(await readFile('.version', { encoding: 'utf8' }));

  const netservice = new NetService(process.env.DOMAIN);
  netservice
    .on('ready', async () => logger().info(chalk.greenBright('<< Ready >>')))

    .on('ws:ready', async () => logger().info(chalk.greenBright('<< Ws_Server Ready >>')))
    .on('ws:connection', async () => logger().info(chalk.greenBright('<< Got Connected!! >>')))
    .on('ws:message', async ({client, data}) => {
      const
        _data = JSON.parse(data),
        payload = _data.p;

        client.send(payload.msg);
        
      
    })
    .on('ws:disconnect', async () => logger().info(chalk.greenBright('<< Got DisConnected!! >>')))
    .on('ws:error', async () => logger().info(chalk.greenBright(e)))

  netservice.MiddlewareMgr
    .register('*', netservice.Safety.mwRateLimit())
    .register('*', netservice.Safety.mwBlockList());

  process
    .on('SIGINT', async () => await gracefulShutdown(netservice))
    .on('SIGTERM', async () => await gracefulShutdown(netservice));

  readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
    .on('line', async (input) => {
      if (input.trim().toLowerCase() === 'shutdown') {
        await gracefulShutdown(netservice);
      }
    });

}
catch (e) {
  console.error(e);
  logger().error('Construction Error:', e);
};
