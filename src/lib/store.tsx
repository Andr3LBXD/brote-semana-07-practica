import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { initialData, isPlannerData, type ClassEntry, type PlannerData, type Settings, type Task } from './types';

type Store = PlannerData & { ready: boolean; storageError: boolean; recoverStorage: () => void; saveTask: (task: Task) => void; deleteTask: (id: string) => void; saveClass: (entry: ClassEntry) => void; deleteClass: (id: string) => void; updateSettings: (settings: Settings) => void };
const STORAGE_KEY = '@planificador/alumno/v1';
const StoreContext = createContext<Store | null>(null);

export function PlannerProvider({ children }: React.PropsWithChildren) {
  const [data, setData] = useState<PlannerData>(initialData);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [persistenceEnabled, setPersistenceEnabled] = useState(false);
  const writeQueue = useRef<Promise<void>>(Promise.resolve());

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (!active) return;
      if (raw) {
        try {
          const parsed: unknown = JSON.parse(raw);
          if (!isPlannerData(parsed)) { setStorageError(true); return; }
          setData(parsed);
        } catch { setStorageError(true); return; }
      }
      setPersistenceEnabled(true);
    }).catch(() => { if (active) setStorageError(true); }).finally(() => { if (active) setReady(true); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (ready && persistenceEnabled) {
      const serialized = JSON.stringify(data);
      writeQueue.current = writeQueue.current.catch(() => undefined).then(() => AsyncStorage.setItem(STORAGE_KEY, serialized)).catch(() => { setStorageError(true); setPersistenceEnabled(false); });
    }
  }, [data, ready, persistenceEnabled]);

  const value = useMemo<Store>(() => ({
    ...data, ready, storageError, recoverStorage: () => { setStorageError(false); setPersistenceEnabled(true); },
    saveTask: (task) => setData((prev) => ({ ...prev, tasks: prev.tasks.some((item) => item.id === task.id) ? prev.tasks.map((item) => item.id === task.id ? task : item) : [task, ...prev.tasks] })),
    deleteTask: (id) => setData((prev) => ({ ...prev, tasks: prev.tasks.filter((item) => item.id !== id) })),
    saveClass: (entry) => setData((prev) => ({ ...prev, classes: prev.classes.some((item) => item.id === entry.id) ? prev.classes.map((item) => item.id === entry.id ? entry : item) : [...prev.classes, entry] })),
    deleteClass: (id) => setData((prev) => ({ ...prev, classes: prev.classes.filter((item) => item.id !== id) })),
    updateSettings: (settings) => setData((prev) => ({ ...prev, settings })),
  }), [data, ready, storageError]);
  if (!ready) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F5ED' }}><ActivityIndicator color="#71977C" /></View>;
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function usePlanner() {
  const store = useContext(StoreContext);
  if (!store) throw new Error('usePlanner debe usarse dentro de PlannerProvider.');
  return store;
}
