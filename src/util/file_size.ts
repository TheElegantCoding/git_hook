export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) { return '0 B'; }
  const kilobytes = 1024;
  const sizes = [
    'B',
    'KB',
    'MB',
    'GB'
  ];
  const index = Math.floor(Math.log(bytes) / Math.log(kilobytes));
  return `${Number.parseFloat(((bytes / kilobytes) ** index).toFixed(2))} ${sizes[index]}`;
};