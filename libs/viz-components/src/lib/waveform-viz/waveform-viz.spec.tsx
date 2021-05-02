import { render } from '@testing-library/react';

import WaveformViz from './waveform-viz';

describe('WaveformViz', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WaveformViz />);
    expect(baseElement).toBeTruthy();
  });
});
