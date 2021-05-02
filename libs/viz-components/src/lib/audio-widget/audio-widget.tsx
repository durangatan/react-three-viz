import { AnalyzerDataContext } from '@visualizer/viz-components';
import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilled from '@material-ui/icons/PauseCircleFilled';
import { useMouseIsMoving } from '@visualizer/viz-hooks';

const PlaybackControls = styled.nav<{ show: boolean }>`
  position: absolute;
  bottom: 0;
  width: 100%;
  align-items: center;
  justify-content: center;
  .MuiSvgIcon-root {
    height: 36px;
    width: 36px;
  }
  display: ${({ show }) => (show ? 'flex' : 'none')};
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlaybackControl = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export interface AudioWidgetProps {
  analyzer?: AnalyserNode;
  setAnalyzer: (analyzer: AnalyserNode) => void;
  audioContext?: AudioContext;
}

enum AudioState {
  Stopped = 'stopped',
  Loading = 'loading',
  Playing = 'playing',
  Paused = 'paused',
}

export function AudioElement({
  analyzer,
  setAnalyzer,
  audioContext,
}: AudioWidgetProps) {
  const [audioState, setAudioState] = useState(AudioState.Stopped);
  const { startAnalysis } = useContext(AnalyzerDataContext);
  const audioRef = useRef(null);
  const play = () => {
    audioRef.current.play();
    setAudioState(AudioState.Playing);
  };
  const pause = () => {
    audioRef.current.pause();
    setAudioState(AudioState.Paused);
  };

  const isMoving = useMouseIsMoving();

  useEffect(() => {
    audioRef.current.load();
    setAudioState(AudioState.Loading);
    const sourceNode = audioContext.createMediaElementSource(audioRef.current);
    play();
    const analyzer = audioContext.createAnalyser();
    analyzer.fftSize = 512;
    sourceNode.connect(analyzer);
    sourceNode.connect(audioContext.destination);
    setAnalyzer(analyzer);
  }, [audioContext, setAnalyzer]);

  useEffect(() => {
    const toggle = () => {
      audioState === AudioState.Paused ? play() : pause();
    };
    const listener = (e) => {
      if (e.keyCode === 32) {
        toggle();
      }
    };
    document.addEventListener('keyup', listener);
    return () => document.removeEventListener('keyup', listener);
  }, [audioState]);

  return (
    <PlaybackControls show={isMoving}>
      <ControlsContainer>
        {audioState === AudioState.Playing && (
          <PlaybackControl onClick={pause}>
            <PauseCircleFilled />
          </PlaybackControl>
        )}
        {audioState === AudioState.Paused && (
          <PlaybackControl onClick={play}>
            <PlayCircleFilled />
          </PlaybackControl>
        )}
      </ControlsContainer>
      <audio ref={audioRef} onPlay={startAnalysis} src="assets/PYRE.mp3" />
    </PlaybackControls>
  );
}

export default AudioElement;
