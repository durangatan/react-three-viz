import { ThemeProvider } from 'styled-components';

import {
  AudioContextPrompt,
  TrackVisualizer,
  Themes,
  GlobalStyle,
} from '@visualizer/viz-components';
import React, { useCallback, useState } from 'react';

function tryGetLocalStorageTheme() {
  try {
    const maybeTheme = JSON.parse(localStorage.getItem('VIZ_SPA_THEME'));
    if (
      maybeTheme &&
      maybeTheme.primary &&
      maybeTheme.secondary &&
      maybeTheme.tertiary &&
      maybeTheme.background
    ) {
      return maybeTheme;
    }
    throw new Error('bad theme!');
  } catch {
    localStorage.clear();
  }
}

export function App() {
  const [audioContext, setAudioContext] = useState(null);
  const [analyzer, setAnalyzer] = useState(null);
  const [theme, setTheme] = useState(
    tryGetLocalStorageTheme() || Themes.iceCream
  );

  const onConfirm = useCallback(() => {
    setAudioContext(new AudioContext());
  }, [setAudioContext]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {!audioContext && <AudioContextPrompt onConfirm={onConfirm} />}
      <TrackVisualizer
        audioContext={audioContext}
        analyzer={analyzer}
        setAnalyzer={setAnalyzer}
        theme={theme}
        setTheme={(newTheme) => {
          setTheme(newTheme);
          localStorage.setItem('VIZ_SPA_THEME', JSON.stringify(newTheme));
        }}
      />
    </ThemeProvider>
  );
}

export default App;
