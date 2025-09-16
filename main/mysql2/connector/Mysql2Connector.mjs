/**
 * The MySQL database connector module for OnSocket.
 * 
 * @file Mysql2Connector.mjs
 * @module Mysql2Connector
 * @requires mysql2/promise
 */

import { createConnection } from 'mysql2/promise';
const
  { _mysqlConnectionOptions } = (await import('../../../config.json', { with: { type: "json" } })).default,
  maxRetries = 3;

/**
 * Executes a SQL query using a single connection.
 *
 * @param {string} queryString - The SQL query string to execute.
 * @param {any[]} values - The values to be used in the query.
 * @returns {Promise<any>}
 */
export async function sqlSet(queryString, values) {
  if (!queryString) {
    return new Error('Invalid parameters provided. (This could be a missing querystring or values)');
  }

  let retries = 0;

  while (retries < maxRetries) {
    try {
      const c = await createConnection(_mysqlConnectionOptions);
      try {
        const [r] = await c.execute(queryString, values);

        // Release the connection
        c.end();

        // Check if r is an array (SELECT queries)
        return Array.isArray(r)
          // SELECT queries
          ? r.length > 1 ? r : r[0] ?? r

          // INSERT, UPDATE, DELETE queries
          : (r).affectedRows !== undefined
            ? r
            : false;

      } catch (e) {
        // Release the connection and return the error
        c.end();
        console.error('Error in sqlSet:', e);
        return e;
      }
    } catch (/**@type {any}*/e) {
      if (e instanceof Error) {
        console.error('Error in sqlSet:', e);
        return e;
      }
      if (e.code === 'ER_ACCESS_DENIED_ERROR') {
        console.error('Error in sqlSet:', e);
        return e;
      }
      if (e.code === 'ER_TIMED_OUT') { // Connection timeout. Retry.
        retries++;
      }
    };
  };
};
