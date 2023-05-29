export const helpers = {
  ifeq: function (v1, v2, options) {
    if (v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  },
  ifand: function (v1, options) {
    if (v1 === 'admin' || v1 === 'premium') {
      return options.fn(this);
    }
    return options.inverse(this);
  },
};
