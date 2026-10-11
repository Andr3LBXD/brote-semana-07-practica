import { returnTo } from '@/lib/navigation';
import { Link, useLocalSearchParams } from 'expo-router';
import { Alert, Pressable, Text, View } from 'react-native';
import { Button, Card, Heading, Screen } from '@/components/planner-ui';
import { usePlanner } from '@/lib/store';
import { useAccent, usePalette } from '@/lib/theme';
export default function TaskDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>(); const { tasks, deleteTask, saveTask } = usePlanner(); const c = usePalette(); const accent = useAccent();
  const task = tasks.find((item) => item.id === id);
  if (!task) return <Screen><Heading title="Tarea no encontrada" /><Button title="Volver" onPress={() => returnTo('/tasks')} /></Screen>;
  return <Screen><Heading title="Detalle" right={<Link href={{ pathname: '/task/edit/[id]', params: { id: task.id } }} asChild><Pressable><Text style={{ color: accent, fontWeight: '700' }}>Editar</Text></Pressable></Link>} />
    <Card><Text style={{ color: c.text, fontSize: 23, fontWeight: '800' }}>{task.title}</Text><Text style={{ color: accent, marginTop: 12, fontWeight: '700' }}>{task.subject}</Text><Text style={{ color: c.muted, marginTop: 8 }}>Entrega: {task.dueDate}</Text><Text style={{ color: c.muted, marginTop: 5 }}>Prioridad: {task.priority}</Text><Text style={{ color: c.muted, marginTop: 5 }}>Estado: {task.status}</Text>{task.notes ? <Text style={{ color: c.text, marginTop: 18, lineHeight: 22 }}>{task.notes}</Text> : null}</Card>
    <Button title={task.status === 'Completada' ? 'Marcar pendiente' : 'Marcar como completada'} onPress={() => saveTask({ ...task, status: task.status === 'Completada' ? 'Pendiente' : 'Completada' })} secondary />
    <Button title="Eliminar tarea" danger onPress={() => Alert.alert('Eliminar tarea', '¿Quieres eliminar esta tarea?', [{ text: 'Cancelar', style: 'cancel' }, { text: 'Eliminar', style: 'destructive', onPress: () => { deleteTask(task.id); returnTo('/tasks'); } }])} />
    <View style={{ alignItems: 'center' }}><Pressable accessibilityRole="button" accessibilityLabel="Volver a tareas" onPress={() => returnTo('/tasks')}><Text style={{ color: c.muted, padding: 8 }}>Volver a tareas</Text></Pressable></View>
  </Screen>;
}
