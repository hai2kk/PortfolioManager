let APIConstants = {
  STOCK_LOOKUP_URL: function(query) {
    return `http://autoc.finance.yahoo.com/autoc?query=${query}&region=US&lang=en-GB`;
  },
  TIME_SERIES_LOOKUP_URL: function(query,apiKey) {
    return `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${query}&apikey=${apiKey}`;
  },
  TIME_SERIES_OBJECT_KEY : "Time Series (Daily)",
  TIME_SERIES_CLOSING_KEY : "4. close",
  TIME_SERIES_CRYPTO_LOOKUP_URL : function(query){
    return `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${query}&market=usd&apikey=WQ7GDMMTU3DONZE7`;
  },
  TIME_SERIES_CRYPTO_OBJECT_KEY : "Time Series (Digital Currency Daily)",
  TIME_SERIES_CRYPTO_PRICE_KEY : "4a. close (USD)",
};

export {APIConstants}