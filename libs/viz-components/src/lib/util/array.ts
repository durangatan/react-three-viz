export function avg(arr) {
  const total = arr.reduce((sum, b) => sum + b, 0);
  return total / arr.length;
}

export function max(arr) {
  return arr.reduce((a, b) => Math.max(a, b), 0);
}

export function getArrayReduction(freqDataArray) {
  const lowerHalfArray = freqDataArray.slice(0, freqDataArray.length / 2 - 1);
  const upperHalfArray = freqDataArray.slice(
    freqDataArray.length / 2 - 1,
    freqDataArray.length - 1
  );
  // do some basic reductions/normalisations
  const lowerAvg = avg(lowerHalfArray);
  const upperAvg = avg(upperHalfArray);
  const lowerMax = max(lowerHalfArray);
  const upperMax = max(upperHalfArray);
  const lowerMaxFr = lowerMax / lowerHalfArray.length;
  const lowerAvgFr = lowerAvg / lowerHalfArray.length;
  const upperAvgFr = upperAvg / upperHalfArray.length;
  const upperMaxFr = upperMax / upperHalfArray.length;
  return { lowerMaxFr, lowerAvgFr, upperAvgFr, upperMaxFr };
}
