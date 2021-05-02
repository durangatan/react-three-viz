import { useRef, useEffect } from 'react';

interface IUseAnalyserArguments {
  mediaRef?: HTMLMediaElement;
  streamRef?: MediaStream;
  isPlaying: boolean;
}
function getSourceNode(
  { mediaRef, streamRef }: IUseAnalyserArguments,
  audioContext: AudioContext
): AudioNode | void {
  const audioSourceMap = new Map();
  audioSourceMap.set(mediaRef, () =>
    audioContext.createMediaElementSource(mediaRef)
  );
  audioSourceMap.set(streamRef, () =>
    audioContext.createMediaStreamSource(streamRef)
  );
  let sourceNode;
  for (const [sourceOption, sourceGetter] of audioSourceMap) {
    if (sourceNode) break;
    if (sourceOption) {
      sourceNode = sourceGetter();
    }
  }
  return sourceNode;
}

export function useAnalyser(args: IUseAnalyserArguments) {
  const audioContextRef = useRef(new AudioContext());
  const analyserNodeRef = useRef(null);
  const dataArrayRef = useRef(null);
  const sourceNode = useRef(null);
  useEffect(() => {
    if (!sourceNode.current)
      sourceNode.current = getSourceNode(args, audioContextRef.current);
    if (sourceNode.current && args.isPlaying) {

      analyserNodeRef.current = audioContextRef.current.createAnalyser();
      sourceNode.current.connect(analyserNodeRef.current);
      // The default value of FFT Size is 2048, but we chose a lower resolution of 512 as it’s far easier to compute
      analyserNodeRef.current.fftSize = 512;
      dataArrayRef.current = new Uint8Array(
        analyserNodeRef.current.frequencyBinCount
      );
    }
  }, [args]);
  return {
    dataArray: dataArrayRef,
    analyserNode: analyserNodeRef,
    audioContext: audioContextRef,
  };
}
