
import NetService from 'netservice';
import nodemailer from 'nodemailer';
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
    // await NetService.NextServer.close();
    // logger().info(chalk.yellowBright('<< NextServer Offline >>'));

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


/**
 * 
 * @param {string} email
 * @param {string} subject
 * @param {string} text
 * @param {string} html
 * @returns {Promise<SMTPPool.SentMessageInfo>}
 */
export async function sendEmail(email, subject, text, html) {
  try {
    const
      SMTPTransportOptions = {
        "host": process.env.SMTP_HOST,
        "port": process.env.SMTP_PORT,
        "secure": true,
        "auth": {
          "user": process.env.SMTP_USER,
          "pass": process.env.SMTP_PASS
        }
      },
      transporter = nodemailer.createTransport({ ...SMTPTransportOptions }),
      info = await transporter.sendMail({
        from: '"Goodsie.ca" <mike@goodsie.ca>',
        to: process.env.SMTP_USER,
        subject: subject,
        text: text,
        html: html
      });

    return info;
  } 
  catch (e) {
    console.error(e);
    return false;
  };
};



/**
 * Helper function to write a response and end the connection.
 */
export async function WriteAndEnd(res, statusCode, message) {
  return res
    .writeHead(statusCode, {
      'Content-Length': Buffer.byteLength(message),
      'Content-Type': 'text/plain'
    })
    .end(message);
};

