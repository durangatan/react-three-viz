import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PaletteOutlined from '@material-ui/icons/PaletteOutlined';
import DiceIcon from '@material-ui/icons/CasinoOutlined';
import _ from 'lodash';
import { ThemeEditor, CircleMenu, Theme } from '@visualizer/viz-components';
import { getRandomTheme } from '../util/theme';
import { useMouseIsMoving } from '@visualizer/viz-hooks';
export interface VizEditorProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export function VizEditor({ theme, setTheme }: VizEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showThemeEditorState, setShowThemeEditorState] = useState(false);
  const hideThemeEditor = useCallback(() => setShowThemeEditorState(false), [
    setShowThemeEditorState,
  ]);
  const showThemeEditor = useCallback(() => setShowThemeEditorState(true), [
    setShowThemeEditorState,
  ]);
  const timer = useRef(null);

  const isMoving = useMouseIsMoving();

  useEffect(() => {
    setShowMenu(isMoving);
  }, [isMoving]);

  return (
    <CircleMenu
      isVisible={showMenu || isOpen}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onClose={() => {
        hideThemeEditor();
        setShowMenu(false);
      }}
      items={[
        {
          id: 'themeEditor',
          icon: <PaletteOutlined />,
          onClick: () => setShowThemeEditorState(!showThemeEditorState),
          children: showThemeEditorState ? (
            <ThemeEditor currentTheme={theme} setTheme={setTheme} />
          ) : null,
        },
        {
          id: 'randomizer',
          icon: <DiceIcon />,
          onClick: () => {
            setTheme(getRandomTheme());
          },
        },
      ]}
    />
  );
}

export default VizEditor;
