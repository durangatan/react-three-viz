export function fractionate(val, minVal, maxVal) {
  return (val - minVal) / (maxVal - minVal);
}

export function modulate(val, minVal, maxVal, outMin, outMax) {
  const fr = fractionate(val, minVal, maxVal);
  const delta = outMax - outMin;
  return outMin + fr * delta;
}
