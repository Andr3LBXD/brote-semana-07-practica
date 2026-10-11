import { returnTo } from '@/lib/navigation';

import { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Field, Heading, Pill, Screen } from '@/components/planner-ui';
import { usePlanner } from '@/lib/store';
import { usePalette } from '@/lib/theme';
import { SUBJECTS, validateTask, type Priority, type Task, type TaskStatus } from '@/lib/types';

function localDateString() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function TaskForm({ existing }: { existing?: Task }) {
  const c = usePalette(); const { saveTask } = usePlanner();
  const [title, setTitle] = useState(existing?.title ?? ''); const [subject, setSubject] = useState(existing?.subject ?? SUBJECTS[0]);
  const [dueDate, setDueDate] = useState(existing?.dueDate ?? localDateString());
  const [priority, setPriority] = useState<Priority>(existing?.priority ?? 'Media'); const [status, setStatus] = useState<TaskStatus>(existing?.status ?? 'Pendiente'); const [notes, setNotes] = useState(existing?.notes ?? '');
  const [error, setError] = useState('');
  function submit() {
    const next = { title, subject, dueDate, priority, status, notes };
    const validationError = validateTask(next);
    if (validationError) { setError(validationError); return; }
    saveTask({ ...next, id: existing?.id ?? `task-${Date.now()}` }); returnTo('/tasks');
  }
  return <Screen><Heading title={existing ? 'Editar tarea' : 'Nueva tarea'} subtitle="Organiza tus próximos pasos." />
    <Field label="Nombre de la tarea" value={title} onChangeText={(value) => { setTitle(value); setError(''); }} placeholder="Ej. Entregar informe" />
    <Text style={{ color: c.text, fontWeight: '700' }}>Materia</Text><View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: -8, marginBottom: 8 }}>{SUBJECTS.map((item) => <Pill key={item} label={item} selected={subject === item} onPress={() => setSubject(item)} />)}</View>
    <Field label="Fecha de entrega (AAAA-MM-DD)" value={dueDate} onChangeText={(value) => { setDueDate(value); setError(''); }} placeholder="2026-10-20" keyboardType="numbers-and-punctuation" />
    <Text style={{ color: c.text, fontWeight: '700' }}>Prioridad</Text><View style={{ flexDirection: 'row', gap: 8, marginTop: -8 }}>{(['Alta', 'Media', 'Baja'] as Priority[]).map((item) => <Pill key={item} label={item} selected={priority === item} onPress={() => setPriority(item)} />)}</View>
    {existing ? <><Text style={{ color: c.text, fontWeight: '700' }}>Estado</Text><View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: -8 }}>{(['Pendiente', 'En progreso', 'Completada'] as TaskStatus[]).map((item) => <Pill key={item} label={item} selected={status === item} onPress={() => setStatus(item)} />)}</View></> : null}
    <Field label="Notas (opcional)" value={notes} onChangeText={setNotes} placeholder="Añade un recordatorio…" multiline numberOfLines={4} style={{ minHeight: 95, textAlignVertical: 'top' }} />
    {error ? <Text accessibilityRole="alert" style={{ color: c.orange, marginTop: -8, marginBottom: 4 }}>{error}</Text> : null}
    <Button title={existing ? 'Guardar cambios' : 'Crear tarea'} onPress={submit} />
  </Screen>;
}
