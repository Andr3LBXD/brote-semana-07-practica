import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { ClassForm } from '@/components/class-form';
import { Screen } from '@/components/planner-ui';
import { usePlanner } from '@/lib/store';
import { usePalette } from '@/lib/theme';
export default function EditClassRoute() { const { id } = useLocalSearchParams<{ id: string }>(); const { classes } = usePlanner(); const c = usePalette(); const item = classes.find((entry) => entry.id === id); return item ? <ClassForm existing={item} /> : <Screen><Text style={{ color: c.text }}>No encontramos esta clase.</Text></Screen>; }
