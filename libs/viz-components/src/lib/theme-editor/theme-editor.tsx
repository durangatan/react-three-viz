import { Theme } from '@visualizer/viz-components';
import React, { useCallback } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import ColorDrop from '@material-ui/icons/Opacity';
export interface ThemeEditorProps {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeEditorContainer = styled.ul`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 0;
  right: 36px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px 0 0 8px;
  padding: 5px;
`;
const ThemeEditorItem = styled.li<{ fill: string }>`
  position: relative;
  .MuiSvgIcon-root {
    position: absolute;
    fill: ${({ fill }) => fill};
    top: -4px;
    left: 0;
    pointer-events: none;
  }
`;
const ThemeEditorInput = styled.input.attrs({ type: 'color' })`
  width: 2em;
  opacity: 0;
`;

export function ThemeEditor({ currentTheme, setTheme }: ThemeEditorProps) {
  const setThemeDebounced = useCallback(_.debounce(setTheme, 100), []);
  return (
    <ThemeEditorContainer onClick={(e) => e.stopPropagation()}>
      {Object.keys(currentTheme).map((themeKey) => (
        <ThemeEditorItem key={themeKey} fill={currentTheme[themeKey]}>
          <ThemeEditorInput
            value={currentTheme[themeKey]}
            onChange={({ currentTarget: { value } }) => {
              setThemeDebounced({ ...currentTheme, [themeKey]: value });
            }}
          />
          <ColorDrop />
        </ThemeEditorItem>
      ))}
    </ThemeEditorContainer>
  );
}

export default ThemeEditor;
