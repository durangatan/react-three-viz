export const getRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`.toUpperCase();
export const getRandomTheme = () => ({
  primary: getRandomColor(),
  secondary: getRandomColor(),
  tertiary: getRandomColor(),
  background: getRandomColor(),
});
