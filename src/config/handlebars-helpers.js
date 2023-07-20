const helpers = {
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
  ifusers: function (v1, options) {
    if (v1 === 'user' || v1 === 'premium') {
      return options.fn(this);
    }
    return options.inverse(this);
  },

  ifdocuments: function (v1, v2, options) {
    const document = v2.find(document => document.name === v1);
    if (!document) {      
      return options.fn(this);
    }
    return options.inverse(this);
  },
};

export {
  helpers
}
