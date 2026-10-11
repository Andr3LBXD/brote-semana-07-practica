import { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Card, Field, Heading, Pill, Screen } from '@/components/planner-ui';
import { usePlanner } from '@/lib/store';
import { usePalette } from '@/lib/theme';
import type { Settings } from '@/lib/types';
export default function SettingsScreen() {
  const c = usePalette(); const { settings, updateSettings, storageError, recoverStorage } = usePlanner(); const [name, setName] = useState(settings.name); const [accent, setAccent] = useState<Settings['accent']>(settings.accent); const [colorScheme, setColorScheme] = useState<Settings['colorScheme']>(settings.colorScheme); const [saved, setSaved] = useState(false);
  return <Screen><Heading title="Ajustes" subtitle="Haz que Brote se sienta como tuyo." />
    <Card><Text style={{ color: c.text, fontWeight: '800', fontSize: 17, marginBottom: 14 }}>Tu perfil</Text><Field label="Tu nombre" value={name} onChangeText={(value) => { setName(value); setSaved(false); }} placeholder="¿Cómo te llamas?" autoCapitalize="words" /></Card>
    <Card style={{ gap: 12 }}><Text style={{ color: c.text, fontWeight: '800', fontSize: 17 }}>Color de acento</Text><Text style={{ color: c.muted, fontSize: 13 }}>Elige el tono que acompaña tus avances.</Text><View style={{ flexDirection: 'row', gap: 9 }}><Pill label="Verde hoja" selected={accent === 'verde'} onPress={() => { setAccent('verde'); setSaved(false); }} /><Pill label="Naranja cálido" selected={accent === 'naranja'} onPress={() => { setAccent('naranja'); setSaved(false); }} /></View></Card>
    <Card style={{ gap: 12 }}><Text style={{ color: c.text, fontWeight: '800', fontSize: 17 }}>Apariencia</Text><Text style={{ color: c.muted, fontSize: 13 }}>Elige cómo se ve la app.</Text><View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>{([['system', 'Sistema'], ['light', 'Claro'], ['dark', 'Oscuro']] as const).map(([value, label]) => <Pill key={value} label={label} selected={colorScheme === value} onPress={() => { setColorScheme(value); setSaved(false); }} />)}</View></Card>
    <Button title={saved ? 'Cambios guardados ✓' : 'Guardar cambios'} onPress={() => { updateSettings({ name: name.trim(), accent, colorScheme }); setSaved(true); }} />
    {storageError ? <Button title="Reintentar guardado local" secondary onPress={recoverStorage} /> : null}
    <Text style={{ color: c.muted, textAlign: 'center', fontSize: 12 }}>Brote · Tu compañero de estudio 🌱</Text>
  </Screen>;
}
