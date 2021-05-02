import { render } from '@testing-library/react';

import TrackVisualizer from './track-visualizer';

describe('TrackVisualizer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TrackVisualizer />);
    expect(baseElement).toBeTruthy();
  });
});
