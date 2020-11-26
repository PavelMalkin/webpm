export const endpoints = {
  projects: 'projects'
};

// const appBase = 'https://5efa3683bc5f8f0016c677df.mockapi.io/webpm/';
const appBase = 'http://localhost:8000/';

export const getEndpointName = (entity) => {
  return `${appBase}${endpoints[entity]}`;
};
