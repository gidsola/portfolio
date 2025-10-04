import 'dotenv/config';
import { readFile } from 'fs/promises';
import { OnSocketBanner } from './banners.mjs';
import NetService from 'netservice';
import logger from './logger.mjs';
import readline from 'readline';
import chalk from 'chalk';
import { gracefulShutdown } from './helpers.mjs';
import ws from 'ws';


/** @type {Payload} @typedef {{msg:string}} Payload */
/** @type {Client} @typedef {ws} Client */
/** @type {RawData} @typedef {ArrayBuffer | Buffer<ArrayBufferLike>} RawData */
/** @type {Data} @typedef {{client:Client, data:RawData}} Data */


try {
  // startup check, bail if no version info
  OnSocketBanner(await readFile('.version', { encoding: 'utf8' }));

  const netservice = new NetService(process.env.DOMAIN);

  netservice
    .Server
    .on('listening', async () => {
      logger('SERVER').info(chalk.greenBright('<< Server Listening >>'));

      netservice
        .Sockitz
        .on('zREADY', async () => logger('SOCKITZ').info(chalk.greenBright('<< Client Hello >>')))
        .on('zMESSAGE', async (/**@type {Data}*/{ client, data }) => {
          const
          /**@type {Payload}*/payload = JSON.parse(data);

          client.send(payload.msg);

        
        
        
        })
        .on('zCLOSE', async () => logger('SOCKITZ').info(chalk.greenBright('<< Client DisConnected >>')))
        .on('zERROR', async () => logger('SOCKITZ').info(chalk.redBright(e)))

      netservice
        .MiddlewareMgr
        .register('*', netservice.Safety.mwRateLimit())
        .register('*', netservice.Safety.mwBlockList());

      readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })
        .on('line', async (input) => {
          if (input.trim().toLowerCase() === 'shutdown') {
            await gracefulShutdown(netservice);
          }
        });

      process
        .on('SIGINT', async () => await gracefulShutdown(netservice))
        .on('SIGTERM', async () => await gracefulShutdown(netservice));

      netservice
        .on('ready', async () => logger().info(chalk.greenBright('<< All Systems Ready >>')))
    });
}
catch (e) {
  console.error(e);
  logger().error('Construction Error:', e);
};
