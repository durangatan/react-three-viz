import { render } from '@testing-library/react';

import Videowidget from './videowidget';

describe('Videowidget', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Videowidget />);
    expect(baseElement).toBeTruthy();
  });
});
