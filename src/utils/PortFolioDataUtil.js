/* export async function retrieveTimeSeries(timeSeriesDataURL) {
  const response = await fetch(timeSeriesDataURL);
  const data = await response.json();
  return data;
} */

export async function retrieveData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export function compareWatchList(stockObj1, stockObj2) {
  const symbol1 = stockObj1.symbol.toUpperCase();
  const symbol2 = stockObj2.symbol.toUpperCase();

  let comparison = 0;
  if (symbol1 > symbol2) {
    comparison = 1;
  } else if (symbol1 < symbol2) {
    comparison = -1;
  }
  return comparison;
}
