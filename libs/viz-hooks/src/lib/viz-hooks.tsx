import React from 'react';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface VizHooksProps {}

const StyledVizHooks = styled.div`
  color: pink;
`;

export function VizHooks(props: VizHooksProps) {
  return (
    <StyledVizHooks>
      <h1>Welcome to viz-hooks!</h1>
    </StyledVizHooks>
  );
}

export default VizHooks;
