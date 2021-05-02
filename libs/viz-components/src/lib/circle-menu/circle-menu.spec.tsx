import { render } from '@testing-library/react';

import CircleMenu from './circle-menu';

describe('CircleMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CircleMenu />);
    expect(baseElement).toBeTruthy();
  });
});
