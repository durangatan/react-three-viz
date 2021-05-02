import { render } from '@testing-library/react';

import UserDevicesList from './user-devices-list';

describe('UserDevicesList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserDevicesList />);
    expect(baseElement).toBeTruthy();
  });
});
