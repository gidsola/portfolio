import { sqlSet } from '../connector/Mysql2Connector.mjs';

/**
 * 
 * @param {string} uuid 
 * @param {*} containerId 
 * @param {*} container_image 
 * @param {*} container_name 
 * @param {*} container_options 
 */
async function addProjectContainer(uuid, containerId, container_image, container_name, container_options) {
  const
    query = 'INSERT INTO project_containers (id, uuid, container_id, container_image, container_name, container_options) VALUES (id, ?, ?, ?, ?, ?)',
    values = [uuid, containerId, container_image, container_name, container_options];
  await sqlSet(query, [...values]);
};

/**
 * 
 * @param {string} uuid 
 * @returns 
 */
async function getProjectContainer(uuid) {
  const
    query = 'SELECT * FROM project_containers WHERE uuid = ?',
    values = [uuid];
  return await sqlSet(query, [...values]);
};


export {
  addProjectContainer,
  getProjectContainer,
};