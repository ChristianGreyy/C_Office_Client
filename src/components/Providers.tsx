'use client';

import React, { PropsWithChildren, createContext, useState } from 'react';

import { EThemeMode } from '../enum';

export const ThemeContext = createContext<{
  value: EThemeMode;
  onChange: (value: EThemeMode) => void;
}>({
  value: EThemeMode.DARK,
  onChange: (value) => {},
});

type Props = {};

const Providers = (props: PropsWithChildren<Props>) => {
  const [theme, setTheme] = useState(EThemeMode.DARK);
  return (
    <ThemeContext.Provider
      value={{
        value: theme,
        onChange: (value: EThemeMode) => setTheme(value),
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default Providers;
