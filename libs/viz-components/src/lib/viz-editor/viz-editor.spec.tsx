import { render } from '@testing-library/react';

import VizEditor from './viz-editor';

describe('VizEditor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VizEditor />);
    expect(baseElement).toBeTruthy();
  });
});
