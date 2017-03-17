let port = 27017;

export const getPort = () => {
  port = (port + 1)%65536;
  if (port <= 27017) {
    port = 27018;
  }
  return port;
};
