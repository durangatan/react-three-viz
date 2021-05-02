import { render } from '@testing-library/react';

import BallScene from './ball-scene';

describe('BallScene', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BallScene />);
    expect(baseElement).toBeTruthy();
  });
});
