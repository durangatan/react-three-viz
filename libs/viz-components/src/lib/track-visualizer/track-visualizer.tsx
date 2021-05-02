import { AudioElement, BallScene, VizEditor } from '@visualizer/viz-components';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import { Theme } from '../themes/themes';

export interface TrackVisualizerProps {
  audioContext?: AudioContext;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  analyzer?: AnalyserNode;
  setAnalyzer: (analyzer: AnalyserNode) => void;
}

const CanvasWrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;

export const AnalyzerDataContext = React.createContext({
  frequencyData: new Uint8Array(),
  waveformData: new Uint8Array(),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  startAnalysis: () => {},
  fftSize: 512,
  frequencyBinCount: 1,
});

export function TrackVisualizer({
  audioContext,
  theme,
  setTheme,
  analyzer,
  setAnalyzer,
}: TrackVisualizerProps) {
  return (
    <div>
      <CanvasWrapper>
        <VizEditor theme={theme} setTheme={setTheme} />
        <Canvas
          camera={{
            fov: 45,
            aspect: window.innerWidth / window.innerHeight,
            near: 0.1,
            far: 1000,
            position: [0, 0, 100],
          }}
        >
          <BallScene analyzer={analyzer} theme={theme} />
        </Canvas>
      </CanvasWrapper>
      {audioContext && (
        <AudioElement
          analyzer={analyzer}
          setAnalyzer={setAnalyzer}
          audioContext={audioContext}
        />
      )}
    </div>
  );
}

export default TrackVisualizer;
