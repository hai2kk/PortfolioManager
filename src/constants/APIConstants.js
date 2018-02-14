let APIConstants = {
  STOCK_LOOKUP_URL: function(query) {
    return `http://autoc.finance.yahoo.com/autoc?query=${query}&region=US&lang=en-GB`;
  },
  TIME_SERIES_LOOKUP_URL: function(query,apiKey) {
    return `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${query}&apikey=${apiKey}`;
    //return `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${query}&apikey=ZM7551JX0M48VW82`;
  },
  TIME_SERIES_OBJECT_KEY : "Time Series (Daily)",
  TIME_SERIES_CLOSING_KEY : "4. close"
};

export {APIConstants}