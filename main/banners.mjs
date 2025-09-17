
import chalk from 'chalk';
import logger from './logger.mjs';

export function OnSocketBanner(version) {
  logger.info((chalk.green('    Starting ++>')));
  logger.info(chalk.magenta('    Portfolio\n\n',
    chalk.blueBright('    Version: ' + '       ' + chalk.yellowBright(version)),
    chalk.blueBright('      Process ID: ' + '    ' + chalk.yellowBright(process.pid) + '\n'),
    chalk.blueBright('    Hardware Arch: ', chalk.yellowBright(process.arch)),
    chalk.blueBright('                          Platform: ' + '      ' + chalk.yellowBright(process.platform) + '\n')));
};
