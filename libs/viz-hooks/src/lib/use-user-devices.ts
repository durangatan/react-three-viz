import { useState, useEffect } from 'react';
export function useUserDevices() {
  const [userDevices, setUserDevices] = useState([]);
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      setUserDevices(devices);
    });
  }, []);
  return userDevices;
}
