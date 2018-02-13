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