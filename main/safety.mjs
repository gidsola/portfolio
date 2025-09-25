import { IncomingMessage, ServerResponse } from 'http';
import logger from './logger.mjs';
import chalk from 'chalk';

/**
 * @typedef {{banExpiry: number, reason: string}} BanData
 * 
 * @typedef {{count: number, lastSeen: number}} LimitData
 * 
 * @typedef {ServerResponse<IncomingMessage>} Response
 * 
 */


const
  urlBlockList = [{ url: "/admin" }],
  ipBlockList = new Map(),
  RateLimitBucket = {},

  RATE_LIMIT = 10,
  INACTIVITY_LENGTH = 10000,
  BAN_LENGTH = 300000,
  SWEEP_INTERVAL = 60000;

  // maintenance();
// const now = Date.now();

function logAccess(type, method, address, url, a = null) {

  const
    owner = "@SAFETY",
    msgString = () => `${chalk.bgBlueBright(address)}: (Method: ${method}, URL: ${chalk.bgBlue(url)}`,
    blockType = {
      "url": () => logger(owner).warn(`[${chalk.bgRedBright("[BLOCKED URL]")}] => ${msgString()}\n`),

      "ip": () => logger(owner).warn(`[${chalk.bgRedBright("[BLOCKED IP]")}] => ${msgString()}\n`),

      "ban": (a) => logger(owner).warn(`[${chalk.bgRedBright("BANNED")}] => Banned until ${a}\n`)
    };

  blockType[type] ? blockType[type](a) : logger("SYSTEM").warn("Unknown Access Log Type..")


  // logger('SAFETY').info(`[BLOCKED] IP ${address} banned until ${new Date(ipBanData.banExpiry)}`);
};

/**
 * 
 * @param {string} method 
 * @param {string} address 
 * @param {string} url 
 * @returns 
 */
export async function isBlocked(method, address, url) {
  try {
    const now = Date.now();

    if (urlBlockList.some((x) => url === x.url)) {
      logAccess("url", method, address, url);
      return true;
    };

    /**
     * @type {BanData}
     */
    const ipBanData = ipBlockList.get(address);
    if (ipBanData?.banExpiry > now) {
      logAccess("ip", method, address, url);
      return true;
    };

    return false;
  }
  catch (e) {
    return true; // just incase the fail is due to the user.
  };
};


/**
 * 
 * @param {string} address
 * @param {BanData} banData
 */
async function setIPBlock(address, banData) {
  try {
    ipBlockList.set(address, { ...banData });
    logAccess("ip", method, address, url);
    return true;
  }
  catch (/**@type {any}*/e) {
    e instanceof Error
      ? logger().error("Error setting IP block", e.message)
      : logger().error("Error setting IP block", e)
    return false;
  };
};


/**
 * 
 * @param {string} method 
 * @param {string} address 
 * @param {string} url 
 * @returns 
 */
export async function isRateLimited(method, address, url) {
  const
    now = Date.now(),
    key = address + ":" + url,
    /**@type {BanData}*/ipBanData = ipBlockList.get(address);

  if (ipBanData?.banExpiry > now) {
    logAccess("ban", method, address, url, new Date(ipBanData.banExpiry));
    return true;
  };

  /**
   * @type {LimitData}
   */
  const rateLimitData = RateLimitBucket[key] || { count: 0, lastSeen: now };

  rateLimitData.count++;
  rateLimitData.lastSeen = now;
  RateLimitBucket[key] = rateLimitData;

  if (rateLimitData.count > RATE_LIMIT) {
    return await setIPBlock(address, {
      banExpiry: now + BAN_LENGTH,
      reason: `Exceeded ${RATE_LIMIT} requests to ${url}`,
    });
  };



  return false;
};


/**
 * @param {Response} res
 * @param {number} statusCode
 * @param {string} message
 *
 */
export async function WriteAndEnd(res, statusCode, message) {
  return res
    .writeHead(statusCode, {
      'Content-Length': Buffer.byteLength(message),
      'Content-Type': 'text/plain'
    })
    .end(message);
};


/**
 * @param {IncomingMessage} req
 * @param {Response} res
 *
 */
export async function isAllowed(req, res) {
  try {
    if (!req.method || !req.url || req.method === "POST") return res.end(); // dont forget posts are blocked..

    if ((await isRateLimited(req.method, req.headers['x-forwarded-for'] /*as string*/ || req.socket.remoteAddress, req.url))) {
      return WriteAndEnd(res, 429, 'Too many requests');
    };

    if ((await isBlocked(req.method, req.socket.remoteAddress, req.url))) {
      return WriteAndEnd(res, 403, `Access Denied`);
    };

    return true;

  } catch (e) {
    logger().error(e);
    return WriteAndEnd(res, 500, 'Internal Server Error');
  };
};


export function maintenance() {
  logger('@MAINTENANCE').info("Initializing RateLimit Bucket Maintenance..")
  setInterval(() => {
    logger('@MAINTENANCE').info("Performing RateLimit Bucket Maintenance..");
    const now = Date.now();
    for (const [key, data] of Object.entries(RateLimitBucket)) {
      if (now - data.lastSeen > INACTIVITY_LENGTH) {
        delete RateLimitBucket[key];
      }
    }
  }, SWEEP_INTERVAL);
};
