export const hasBetweenType = (obj: any) => {
  if (obj && typeof obj === 'object') {
    if (obj._type === 'between') {
      return true;
    }

    for (const key in obj) {
      if (hasBetweenType(obj[key])) {
        return true;
      }
    }
  }
  return false;
};
