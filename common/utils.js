// export function add3Digit(num) {}
module.exports = {
  add3Digit: function (num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  },

  getYMDate: function (str) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return str.substr(0, 10);
  },
};
