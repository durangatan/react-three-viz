import {  useEffect } from 'react';

export function useVideo(videoRef) {
  useEffect(() => {
    if (!videoRef) {
      return;
    }
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      const video = videoRef.current;
      video.srcObject = stream;
    });
  }, [videoRef]);
}
