import React from 'react';
import { Image } from 'expo-image';
import { router, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, type TextInputProps, type ViewStyle } from 'react-native';
import { useAccent, usePalette } from '@/lib/theme';

export function Screen({ children, scroll = true }: React.PropsWithChildren<{ scroll?: boolean }>) {
  const c = usePalette();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const isDetail = pathname.startsWith('/task/') || pathname.startsWith('/class/');
  const goBack = () => router.canGoBack() ? router.back() : router.replace(pathname.startsWith('/class/') ? '/schedule' : '/tasks');
  const content = <>{isDetail ? <Pressable accessibilityRole="button" accessibilityLabel="Volver" onPress={goBack} style={{ minHeight: 44, justifyContent: 'center', alignSelf: 'flex-start', paddingRight: 24 }}><Text style={{ color: c.text, fontWeight: '700' }}>← Volver</Text></Pressable> : null}{children}</>;
  const safeStyle = { paddingTop: Math.max(insets.top, 16), paddingBottom: Math.max(insets.bottom, 20) };
  return scroll ? <ScrollView style={{ flex: 1, backgroundColor: c.bg }} contentContainerStyle={[styles.screen, safeStyle]} keyboardShouldPersistTaps="handled">{content}</ScrollView> : <View style={[styles.screen, safeStyle, { flex: 1, backgroundColor: c.bg }]}>{content}</View>;
}
export function Heading({ title, subtitle, right }: { title: string; subtitle?: string; right?: React.ReactNode }) {
  const c = usePalette();
  return <View style={styles.heading}><View style={{ flex: 1 }}><Text style={[styles.title, { color: c.text }]}>{title}</Text>{subtitle ? <Text style={[styles.subtitle, { color: c.muted }]}>{subtitle}</Text> : null}</View>{right}</View>;
}
export function Card({ children, style }: React.PropsWithChildren<{ style?: ViewStyle }>) {
  const c = usePalette();
  return <View style={[styles.card, { backgroundColor: c.surface, shadowColor: c.shadow, borderColor: c.line }, style]}>{children}</View>;
}
export function Label({ children }: React.PropsWithChildren) { const c = usePalette(); return <Text style={[styles.label, { color: c.text }]}>{children}</Text>; }
export function Field({ label, ...props }: TextInputProps & { label: string }) {
  const c = usePalette();
  return <View style={{ gap: 7, marginBottom: 15 }}><Label>{label}</Label><TextInput accessibilityLabel={label} placeholderTextColor={c.muted} {...props} style={[styles.input, { color: c.text, backgroundColor: c.surface, borderColor: c.line }, props.style]} /></View>;
}
export function Button({ title, onPress, secondary = false, danger = false }: { title: string; onPress: () => void; secondary?: boolean; danger?: boolean }) {
  const c = usePalette(); const accent = useAccent();
  return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.button, { backgroundColor: danger ? c.orangeSoft : secondary ? c.greenSoft : accent, opacity: pressed ? 0.8 : 1 }]}><Text style={{ color: danger ? c.red : secondary ? c.text : '#FFFFFF', fontWeight: '700', fontSize: 15 }}>{title}</Text></Pressable>;
}
export function Pill({ label, selected, onPress, color }: { label: string; selected?: boolean; onPress?: () => void; color?: string }) {
  const c = usePalette(); const accent = useAccent();
  return <Pressable accessibilityRole="button" accessibilityState={{ selected: Boolean(selected) }} onPress={onPress} style={[styles.pill, { backgroundColor: selected ? (color ?? accent) : c.surface, borderColor: selected ? (color ?? accent) : c.line }]}><Text style={{ color: selected ? '#FFFFFF' : c.muted, fontSize: 12, fontWeight: '700' }}>{label}</Text></Pressable>;
}
export function EmptyState({ title, subtitle }: { title: string; subtitle: string }) {
  const c = usePalette();
  return <Card style={{ alignItems: 'center', paddingVertical: 20 }}><Image source={require('../../assets/images/mascot-thinking.png')} contentFit="contain" style={{ width: 116, height: 112, marginBottom: 4 }} accessibilityLabel="Brote pensando" /><Text style={{ color: c.text, fontSize: 16, fontWeight: '700' }}>{title}</Text><Text style={{ color: c.muted, fontSize: 13, textAlign: 'center', marginTop: 6 }}>{subtitle}</Text></Card>;
}
const styles = StyleSheet.create({ screen: { padding: 20, paddingTop: 16, gap: 16 }, heading: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 2 }, title: { fontSize: 28, fontWeight: '800', letterSpacing: -0.5 }, subtitle: { fontSize: 14, marginTop: 5 }, card: { borderRadius: 23, padding: 18, borderWidth: StyleSheet.hairlineWidth, shadowOpacity: 0.07, shadowRadius: 15, shadowOffset: { width: 0, height: 6 }, elevation: 2 }, label: { fontSize: 14, fontWeight: '700' }, input: { borderWidth: 1, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15 }, button: { minHeight: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 18 }, pill: { borderRadius: 24, borderWidth: 1, paddingHorizontal: 13, paddingVertical: 9 } });
