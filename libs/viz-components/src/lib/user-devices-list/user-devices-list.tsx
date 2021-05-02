import { useUserDevices } from '@visualizer/viz-hooks';
import React from 'react';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface UserDevicesListProps {}

export function UserDevicesList(props: UserDevicesListProps) {
  const userDevices = useUserDevices();
  return (
    <section>
      <h2>enumerate devices</h2>
      <ul>
        {userDevices.map((device) => (
          <li key={`${device.deviceId}-${device.kind}`}>{`${device.label}`}</li>
        ))}
      </ul>
    </section>
  );
}

export default UserDevicesList;
