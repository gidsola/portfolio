import { sqlSet } from '../connector/Mysql2Connector';

async function addProjectContainer(uuid: string, containerId: string, container_image: string, container_name: string, container_options: string): Promise<void> {
  const
    query = 'INSERT INTO project_containers (id, uuid, container_id, container_image, container_name) VALUES (id, ?, ?, ?, ?, ?)',
    values = [uuid, containerId, container_image, container_name, container_options];
  await sqlSet(query, [...values]);
};

async function getProjectContainer(uuid: string): Promise<any> {
  const
    query = 'SELECT * FROM project_containers WHERE uuid = ?',
    values = [uuid];
  return await sqlSet(query, [...values]);
};


export {
  addProjectContainer,
  getProjectContainer,
};