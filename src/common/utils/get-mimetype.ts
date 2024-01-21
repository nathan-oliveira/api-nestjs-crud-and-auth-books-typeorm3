export const getMimetype = (path: string | Buffer) => {
  const types = {
    png: 'image/png',
    jpg: 'image/jpg',
    jpeg: 'image/jpeg',
    ico: 'image/x-icon',
  };

  const mimetype = path.toString().split('.')[1];
  return types[mimetype];
};
