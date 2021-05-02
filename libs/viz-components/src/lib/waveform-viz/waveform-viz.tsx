import React, { useCallback, useState } from 'react';

import { AudioVizProps } from '../frequency-viz/frequency-viz';
import { Canvas } from '@visualizer/viz-components';

export function WaveformViz({
  data,
  frequencyBinCount,
  height,
  width,
}: AudioVizProps) {
  const drawWaveformViz = useCallback(
    (canvas) => {
      canvas.fillStyle = 'rgb(200, 200, 200)';
      canvas.fillRect(0, 0, canvas.width, canvas.height);

      canvas.lineWidth = 2;
      canvas.strokeStyle = 'rgb(0, 0, 0)';

      canvas.beginPath();
      const sliceWidth = (canvas.width * 1.0) / frequencyBinCount;

      let x = 0;

      for (let i = 0; i < frequencyBinCount; i++) {
        const v = data[i] / 128.0;
        const y = (v * canvas.height) / 2;
        if (i === 0) {
          canvas.moveTo(x, y);
        } else {
          canvas.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvas.lineTo(canvas.width, canvas.height / 2);
      canvas.stroke();
    },
    [data, frequencyBinCount]
  );
  return (
    <div>
      <Canvas draw={drawWaveformViz} width={width} height={height} />
    </div>
  );
}

export default WaveformViz;
