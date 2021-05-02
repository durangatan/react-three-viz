import { render } from '@testing-library/react';

import ThemeEditor from './theme-editor';

describe('ThemeEditor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ThemeEditor />);
    expect(baseElement).toBeTruthy();
  });
});
