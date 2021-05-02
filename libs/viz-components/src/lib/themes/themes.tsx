export interface Theme {
  background: string;
  primary: string;
  secondary: string;
  tertiary: string;
}

export const Themes: { [themeKey: string]: Theme } = {
  iceCream: {
    background: '#364f6b',
    primary: '#3FC1C9',
    secondary: '#FC5185',
    tertiary: '#F5F5F5',
  },
  summer: {
    background: '#F9A828',
    primary: '#ECECEB',
    secondary: '#07617D',
    tertiary: '#2E383F',
  },
  neon: {
    background: '#AFFFFF',
    primary: '#74DBEF',
    secondary: '#5E88FC',
    tertiary: '#264E86',
  },
  blues: {
    background: '#F6F6F6',
    primary: '#D6E4F0',
    secondary: '#1E56A0',
    tertiary: '#163172',
  },
};
