import { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { usePlanner } from './store';

export const palettes = {
  light: { bg: '#F8F5ED', surface: '#FFFFFF', text: '#27352D', muted: '#859087', line: '#E8E9E1', green: '#71977C', greenSoft: '#EAF2E8', orange: '#D8905B', orangeSoft: '#FBEEE3', red: '#C96E5B', shadow: '#405444' },
  dark: { bg: '#171E1A', surface: '#232D27', text: '#EFF3EC', muted: '#A1ADA3', line: '#354239', green: '#A4C7A8', greenSoft: '#304537', orange: '#E7AD7D', orangeSoft: '#49372B', red: '#EE9A87', shadow: '#000000' },
};
export type Palette = typeof palettes.light;
const ThemeContext = createContext<Palette>(palettes.light);
export function AppThemeProvider({ children }: React.PropsWithChildren) {
  const native = useColorScheme();
  const { settings } = usePlanner();
  const dark = settings.colorScheme === 'dark' || (settings.colorScheme === 'system' && native === 'dark');
  return <ThemeContext.Provider value={dark ? palettes.dark : palettes.light}>{children}</ThemeContext.Provider>;
}
export function usePalette() { return useContext(ThemeContext); }
export function useAccent() {
  const colors = usePalette();
  const { settings } = usePlanner();
  return settings.accent === 'naranja' ? colors.orange : colors.green;
}
export function useAccentSoft() {
  const colors = usePalette();
  const { settings } = usePlanner();
  return settings.accent === 'naranja' ? colors.orangeSoft : colors.greenSoft;
}
