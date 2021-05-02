import React from 'react';
import MouseIcon from '@material-ui/icons/MouseOutlined';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface AudioContextPromptProps {
  onConfirm: () => void;
}

const StyledAudioContextPrompt = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  opacity: 0.9;
  background: white;
  z-index: 100;
`;

const Button = styled.button`
  border: none;
  background: transparent;
  height: 100%;
  width: 100%;
  .MuiSvgIcon-root {
    height: 200px;
    width: 200px;
  }
`;

export function AudioContextPrompt({ onConfirm }: AudioContextPromptProps) {
  return (
    <StyledAudioContextPrompt>
      <Button onClick={onConfirm}>
        <MouseIcon />
      </Button>
    </StyledAudioContextPrompt>
  );
}

export default AudioContextPrompt;
