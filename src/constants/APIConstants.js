let APIConstants = {
  STOCK_LOOKUP_URL: function(query) {
    return `http://autoc.finance.yahoo.com/autoc?query=${query}&region=US&lang=en-GB`;
  }
};

export {APIConstants}