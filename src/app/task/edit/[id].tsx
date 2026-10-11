import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { TaskForm } from '@/components/task-form';
import { usePlanner } from '@/lib/store';
import { Screen } from '@/components/planner-ui';
import { usePalette } from '@/lib/theme';
export default function EditTaskRoute() {
  const { id } = useLocalSearchParams<{ id: string }>(); const { tasks } = usePlanner(); const c = usePalette();
  const task = tasks.find((item) => item.id === id);
  return task ? <TaskForm existing={task} /> : <Screen><Text style={{ color: c.text }}>No encontramos esta tarea.</Text></Screen>;
}
