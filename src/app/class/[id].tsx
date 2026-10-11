import { returnTo } from '@/lib/navigation';
import { Link, useLocalSearchParams } from 'expo-router';
import { Alert, Pressable, Text } from 'react-native';
import { Button, Card, Heading, Screen } from '@/components/planner-ui';
import { usePlanner } from '@/lib/store';
import { useAccent, usePalette } from '@/lib/theme';
export default function ClassDetailRoute() { const { id } = useLocalSearchParams<{ id: string }>(); const { classes, deleteClass } = usePlanner(); const c = usePalette(); const accent = useAccent(); const item = classes.find((entry) => entry.id === id);
  if (!item) return <Screen><Heading title="Clase no encontrada" /><Button title="Volver" onPress={() => returnTo('/schedule')} /></Screen>;
  return <Screen><Heading title="Detalle de clase" right={<Link href={{ pathname: '/class/edit/[id]', params: { id: item.id } }} asChild><Pressable><Text style={{ color: accent, fontWeight: '700' }}>Editar</Text></Pressable></Link>} /><Card><Text style={{ color: c.text, fontSize: 23, fontWeight: '800' }}>{item.subject}</Text><Text style={{ color: accent, marginTop: 12, fontWeight: '700' }}>{item.day}</Text><Text style={{ color: c.muted, marginTop: 8 }}>{item.startTime}–{item.endTime}</Text><Text style={{ color: c.muted, marginTop: 5 }}>{item.room || 'Salón por definir'}</Text></Card><Button title="Eliminar clase" danger onPress={() => Alert.alert('Eliminar clase', '¿Quieres eliminar esta clase del horario?', [{ text: 'Cancelar', style: 'cancel' }, { text: 'Eliminar', style: 'destructive', onPress: () => { deleteClass(item.id); returnTo('/schedule'); } }])} /><Button title="Volver al horario" onPress={() => returnTo('/schedule')} secondary /></Screen>;
}
