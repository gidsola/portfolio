
import logger from './logger.mjs';
import chalk from 'chalk';
// TODO: re-write for mongo
//   AND
// look at access methods. currently loading tables and updating active data

const ipBlockList = [{part:"999.999.999"}];//(await sqlSet('SELECT * FROM ip_blocklist', [])).map((x/*: any*/) => x.part);
const urlBlockList = [{url: "some/path"}];//(await sqlSet('SELECT * FROM url_blocklist', [])).map((x/*: any*/) => x.url);

const RateLimitBucket = new Map();
const rateLimitIpBlockList/*: string[]*/ = [];

/**
 * 
 * @param {string} method 
 * @param {string} address 
 * @param {string} url 
 * @returns 
 */
export async function isBlocked(method/*: string*/, address/*: string*/, url/*: string*/) {
  if (ipBlockList.some((x/*: string*/) => console.log("ip",address?.match(x)))) {

    return true;
  }
  
  if (urlBlockList.some((x/*: string*/) => console.log("url",url?.match(x)))) {
    return true;
  }
  return false;
};

/**
 * 
 * @param {string} method 
 * @param {string} address 
 * @param {string} url 
 * @returns 
 */
export async function isRateLimited(method/*: string*/, address/*: string*/, url/*: string*/)/*: boolean */ {
  const allowedRateLimit = 10;
  const releaseTime = 5000;
  const inactivityTime = 10000;
  const key = `${url}:${address}`;
  const now = Date.now();

  if (rateLimitIpBlockList.includes(address)) {
    const blockTime = RateLimitBucket.get(address);
    if (blockTime && now - blockTime < releaseTime) return true;
    else {
      rateLimitIpBlockList.splice(rateLimitIpBlockList.indexOf(address), 1);
      RateLimitBucket.delete(address);
    }
  };

  if (RateLimitBucket.has(key)) {
    const requestCount = RateLimitBucket.get(key);
    if (requestCount >= allowedRateLimit) {
      rateLimitIpBlockList.push(address);
      RateLimitBucket.set(address, now);
      logger.info(chalk.redBright.bgBlack('Rate Limited: ') + chalk.cyanBright(method, address, url));
      return true;
    } else RateLimitBucket.set(key, requestCount + 1);
  } else RateLimitBucket.set(key, 1);

  setTimeout(() => {
    if (RateLimitBucket.has(key)) RateLimitBucket.delete(key);
  }, inactivityTime);

  return false;
};


/*
-- `local`.ip_blocklist definition

CREATE TABLE `ip_blocklist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `part` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ip_blocklist_id_IDX` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- `local`.url_blocklist definition

CREATE TABLE `url_blocklist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `url_blocklist_id_IDX` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

*/

