import { render } from '@testing-library/react';

import AudioContextPrompt from './audio-context-prompt';

describe('AudioContextPrompt', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AudioContextPrompt />);
    expect(baseElement).toBeTruthy();
  });
});
