import { render } from '@testing-library/react';

import UseMouseIsMoving from './use-mouse-is-moving';

describe('UseMouseIsMoving', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UseMouseIsMoving />);
    expect(baseElement).toBeTruthy();
  });
});
