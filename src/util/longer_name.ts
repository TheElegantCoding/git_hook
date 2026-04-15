const getLongerName = (array: string[]): string => {
  return array.reduce((longer, current) => {
    return current.length > longer.length ? current : longer;
  }, '');
};

export { getLongerName };