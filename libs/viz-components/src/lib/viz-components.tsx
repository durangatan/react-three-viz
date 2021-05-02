import React from 'react';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface VizComponentsProps {}

const StyledVizComponents = styled.div`
  color: pink;
`;

export function VizComponents(props: VizComponentsProps) {
  return (
    <StyledVizComponents>
      <h1>Welcome to viz-components!</h1>
    </StyledVizComponents>
  );
}

export default VizComponents;
