import 'dotenv/config';
import { readFile } from 'fs/promises';
import { OnSocketBanner } from './banners.mjs';
import NetService from 'netservice';
import logger from './logger.mjs';
import readline from 'readline';
import chalk from 'chalk';
import { gracefulShutdown } from './helpers.mjs';
import ws from 'ws';


/** @type {TypeString}   @typedef {"contact" | "auth" | "test"} TypeString */

/** @type {CF_Payload}   @typedef {{type: "contact", name: string, email: string, message: string}} CF_Payload */
/** @type {Auth_Payload} @typedef {{type: "auth", token: string, client_id: string}} Auth_Payload */
/** @type {Test_Payload} @typedef {{type: "test", msg: string}} Test_Payload */
/** @type {Payload}      @typedef {CF_Payload | Auth_Payload | Test_Payload} Payload */

/** @type {Client}       @typedef {ws} Client */
/** @type {RawData}      @typedef {ArrayBuffer | Buffer<ArrayBufferLike>} RawData */
/** @type {Data}         @typedef {{client: Client, data: RawData}} Data */


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

        .on('zREADY', async ({ client, req }) => {
          logger('SOCKITZ').info(chalk.greenBright('<< Client Hello >>'));
        })

        .on('zMESSAGE', async (/**@type {Data}*/{ client, data }) => {
          try {
            const
              /**@type {Payload}*/payload = JSON.parse(data),
              type = payload.type,
              // message = payload.msg,
              /**@type {{TypeString: (payload: Payload)=>{}} } */TypeStrings = {

                "contact": (/**@type {CF_Payload}*/payload) => {
                  client.send(JSON.stringify({ success: true, message: payload.message }));
                  client.close(1000);

                },

                "test": (/**@type {Test_Payload}*/payload) => {
                  client.send(JSON.stringify({ success: true, message: payload.msg }));
                  client.close(1000);
                }

              };

            TypeStrings[type] ? TypeStrings[type](payload) : logger('SOCKITZ').info(chalk.redBright('<< UnHandled TypeString >>'));

          }
          catch (e) {
            logger('SOCKITZ').error(e instanceof Error ? e.message : e);
          };

        })
        .on('zCLOSE', async () => logger('SOCKITZ').info(chalk.greenBright('<< Client DisConnected >>')))
        .on('zERROR', async (e) => logger('SOCKITZ').info(chalk.redBright(e)));

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


    })
    .on('error', async function serviceError(e) {
      logger('@NetService').error(e instanceof Error ? e.message : e);
    })
    .on('clientError', async function clientError(e, socket) {
      socket.destroy(e);
    })
    .on('tlsClientError', async function tlsClientError(e, socket) {
      socket.destroy(e);
    })
    .on('close', async () => {
      await netservice.Safety.cleanup();
    });

  netservice
    .on('ready', async () => logger().info(chalk.greenBright('<< All Systems Ready >>')))
}
catch (e) {
  console.error(e);
  logger().error('Construction Error:', e);
};
