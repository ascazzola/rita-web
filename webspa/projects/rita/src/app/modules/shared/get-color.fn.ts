export function getColor(rgba: number) {
  // tslint:disable-next-line: no-bitwise
  const bits = (rgba >>> 0).toString(2);
  const alpha = parseInt(bits.substr(0, 7), 2);
  const red = parseInt(bits.substr(7, 8), 2);
  const green = parseInt(bits.substr(15, 8), 2);
  const blue = parseInt(bits.substr(23, 8), 2);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}
