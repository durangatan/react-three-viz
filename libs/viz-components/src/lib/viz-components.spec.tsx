import { render } from '@testing-library/react';

import VizComponents from './viz-components';

describe('VizComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VizComponents />);
    expect(baseElement).toBeTruthy();
  });
});
