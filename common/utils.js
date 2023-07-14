export function add3Digit(num) {
  var regexp = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(regexp, ",");
}

export function getYMDate(str) {
  return str.substr(0, 10);
}
