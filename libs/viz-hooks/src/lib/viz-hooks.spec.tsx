import { render } from '@testing-library/react';

import VizHooks from './viz-hooks';

describe('VizHooks', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VizHooks />);
    expect(baseElement).toBeTruthy();
  });
});
