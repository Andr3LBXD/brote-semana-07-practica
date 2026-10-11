import { returnTo } from '@/lib/navigation';

import { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Field, Heading, Pill, Screen } from '@/components/planner-ui';
import { usePlanner } from '@/lib/store';
import { usePalette } from '@/lib/theme';
import { DAYS, SUBJECTS, validateClass, type ClassEntry } from '@/lib/types';
export function ClassForm({ existing }: { existing?: ClassEntry }) {
  const c = usePalette(); const { saveClass } = usePlanner();
  const [subject, setSubject] = useState(existing?.subject ?? SUBJECTS[0]); const [day, setDay] = useState(existing?.day ?? 'Lunes');
  const [startTime, setStartTime] = useState(existing?.startTime ?? '08:00'); const [endTime, setEndTime] = useState(existing?.endTime ?? '09:00'); const [room, setRoom] = useState(existing?.room ?? '');
  const [error, setError] = useState('');
  function submit() { const next = { subject, day, startTime, endTime, room }; const validationError = validateClass(next); if (validationError) { setError(validationError); return; } saveClass({ ...next, id: existing?.id ?? `class-${Date.now()}` }); returnTo('/schedule'); }
  return <Screen><Heading title={existing ? 'Editar clase' : 'Nueva clase'} subtitle="Añade un espacio a tu semana." />
    <Field label="Materia" value={subject} onChangeText={setSubject} placeholder="Ej. Biología" />
    <Text style={{ color: c.text, fontWeight: '700' }}>Día</Text><View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: -8 }}>{DAYS.map((item) => <Pill key={item} label={item} selected={day === item} onPress={() => setDay(item)} />)}</View>
    <Field label="Hora de inicio (HH:MM)" value={startTime} onChangeText={setStartTime} placeholder="08:00" keyboardType="numbers-and-punctuation" />
    <Field label="Hora de fin (HH:MM)" value={endTime} onChangeText={setEndTime} placeholder="09:00" keyboardType="numbers-and-punctuation" />
    <Field label="Salón o lugar (opcional)" value={room} onChangeText={setRoom} placeholder="Aula 204" />
    {error ? <Text accessibilityRole="alert" style={{ color: c.orange, marginTop: -8, marginBottom: 4 }}>{error}</Text> : null}
    <Button title={existing ? 'Guardar cambios' : 'Añadir clase'} onPress={submit} />
  </Screen>;
}
