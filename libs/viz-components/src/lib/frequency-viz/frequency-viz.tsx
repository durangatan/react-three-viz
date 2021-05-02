import { Canvas } from '@visualizer/viz-components';
import React, { useCallback, useEffect, useRef } from 'react';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface AudioVizProps {
  data: Uint8Array;
  height?: number;
  width?: number;
  frequencyBinCount: number;
  fftSize: number;
}

export function FrequencyViz({ data, height, width }: AudioVizProps) {
  const drawFrequencyViz = useCallback(
    (canvas) => {
      canvas.fillStyle = 'blueviolet';
      canvas.fillRect(0, 0, width * 2.5, height);
      const barWidth = (width / data.length) * 2.5;
      let barHeight;
      let x = 0;
      for (let i = 0; i < data.length; i++) {
        barHeight = data[i] / 2;

        canvas.fillStyle = 'rgb(' + (barHeight + 100) + ',100,100)';
        canvas.fillRect(x, height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    },
    [data, height, width]
  );
  return (
    <div style={{ width, height }}>
      <Canvas draw={drawFrequencyViz} width={width} height={height} />
    </div>
  );
}

export default FrequencyViz;
