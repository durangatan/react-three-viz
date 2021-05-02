import { useState } from 'react';

export function useAnalyserData(analyzer: AnalyserNode, fftSize = 512) {
  const [frequencyData, setFrequencyData] = useState(new Uint8Array());
  const [waveformData, setWaveformData] = useState(new Uint8Array());
  function updateAnalyzerData() {
    // The default value of FFT Size is 2048, but we chose a lower resolution of 512 as it’s far easier to compute
    analyzer.fftSize = fftSize;
    const freqDataArray = new Uint8Array(analyzer.frequencyBinCount);
    const waveformDataArray = new Uint8Array(analyzer.fftSize);
    analyzer.getByteFrequencyData(freqDataArray);
    analyzer.getByteTimeDomainData(waveformDataArray);
    setFrequencyData(freqDataArray);
    setWaveformData(waveformDataArray);
    requestAnimationFrame(updateAnalyzerData);
  }
  return {
    frequencyData,
    waveformData,
    startAnalysis: updateAnalyzerData,
    fftSize,
    frequencyBinCount: analyzer?.frequencyBinCount || 0,
  };
}
