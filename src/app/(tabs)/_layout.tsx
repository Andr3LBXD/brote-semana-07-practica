import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { usePalette, useAccent } from '@/lib/theme';

const tabs = [
  { name: 'index', title: 'Inicio', icon: '⌂' },
  { name: 'tasks', title: 'Tareas', icon: '✓' },
  { name: 'schedule', title: 'Horario', icon: '▦' },
  { name: 'settings', title: 'Ajustes', icon: '⚙' },
];
export default function TabLayout() {
  const c = usePalette(); const accent = useAccent();
  return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: accent, tabBarInactiveTintColor: c.muted, tabBarStyle: { height: 68, paddingTop: 8, paddingBottom: 8, backgroundColor: c.surface, borderTopColor: c.line }, tabBarLabelStyle: { fontSize: 11, fontWeight: '700' } }}>{tabs.map((tab) => <Tabs.Screen key={tab.name} name={tab.name} options={{ title: tab.title, tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20, fontWeight: '700' }}>{tab.icon}</Text> }} />)}</Tabs>;
}
