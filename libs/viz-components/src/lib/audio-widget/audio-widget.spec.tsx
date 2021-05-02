import { render } from '@testing-library/react';

import AudioWidget from './audio-widget';

describe('AudioWidget', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AudioWidget />);
    expect(baseElement).toBeTruthy();
  });
});
