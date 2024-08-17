import * as fs from 'fs';

export const generateNameImage = () =>
  `${Date.now()}${Math.round(Math.random() * 1e3 * 7)}`;

export const removeImageStorage = (path: string, newPath: string = null) => {
  if (fs.existsSync(path)) fs.unlinkSync(path);
  return newPath;
};

export const getNamePhoto = (path = null) => {
  if (!path) return generateNameImage();
  const paths = path.split('\\');
  return paths[paths.length - 1].split('.')[0];
};

export const updateImageStorage = (imagePath: string, oldImage = null) => {
  const pathAndExt = imagePath.split('.');
  const extension = pathAndExt[pathAndExt.length - 1];
  const paths = imagePath.split('\\');
  paths.pop();

  const nameImg = getNamePhoto(oldImage);
  const completePath = `${paths.join('\\')}\\${nameImg}.${extension}`;

  fs.renameSync(imagePath, completePath);
  return completePath;
};
