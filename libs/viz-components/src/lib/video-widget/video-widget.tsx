import { useVideo } from '@visualizer/viz-hooks';
import React, { useRef } from 'react';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface VideoWidgetProps {}

const StyledVideo = styled.video`
  width: ${(p) => p.width || '200px'};
  height: ${(p) => p.height || '200px'};
`;
export function VideoWidget(props: VideoWidgetProps) {
  const videoRef = useRef(null);
  useVideo(videoRef);
  return (
    <section>
      <h2>video stream</h2>
      <StyledVideo ref={videoRef} />
    </section>
  );
}

export default VideoWidget;
