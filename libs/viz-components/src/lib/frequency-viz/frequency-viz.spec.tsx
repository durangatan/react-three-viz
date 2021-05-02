import { render } from '@testing-library/react';

import FrequencyViz from './frequency-viz';

describe('FrequencyViz', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrequencyViz />);
    expect(baseElement).toBeTruthy();
  });
});
