export type Priority = 'Alta' | 'Media' | 'Baja';
export type TaskStatus = 'Pendiente' | 'En progreso' | 'Completada';
export type Task = { id: string; title: string; subject: string; dueDate: string; priority: Priority; status: TaskStatus; notes: string };
export type ClassEntry = { id: string; subject: string; day: string; startTime: string; endTime: string; room: string };
export type Settings = { name: string; accent: 'verde' | 'naranja'; colorScheme: 'light' | 'dark' | 'system' };
export type PlannerData = { tasks: Task[]; classes: ClassEntry[]; settings: Settings };

export const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
export const SUBJECTS = ['Matemáticas', 'Ciencias', 'Lengua', 'Historia', 'Inglés', 'Arte', 'Programación'];

export function isPlannerData(value: unknown): value is PlannerData {
  if (!value || typeof value !== 'object') return false;
  const data = value as Partial<PlannerData>;
  if (!Array.isArray(data.tasks) || !Array.isArray(data.classes) || !data.settings || typeof data.settings !== 'object') return false;
  const settings = data.settings as Partial<Settings>;
  if (typeof settings.name !== 'string' || !['verde', 'naranja'].includes(settings.accent ?? '') || !['light', 'dark', 'system'].includes(settings.colorScheme ?? '')) return false;
  const validTasks = data.tasks.every((task) => task && typeof task.id === 'string' && typeof task.title === 'string' && typeof task.subject === 'string' && isValidDate(task.dueDate) && ['Alta', 'Media', 'Baja'].includes(task.priority) && ['Pendiente', 'En progreso', 'Completada'].includes(task.status) && typeof task.notes === 'string');
  const validClasses = data.classes.every((entry) => entry && typeof entry.id === 'string' && typeof entry.subject === 'string' && DAYS.includes(entry.day) && isValidTime(entry.startTime) && isValidTime(entry.endTime) && entry.startTime < entry.endTime && typeof entry.room === 'string');
  return validTasks && validClasses;
}

export function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

export function isValidTime(value: string): boolean {
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  return Boolean(match && Number(match[1]) < 24 && Number(match[2]) < 60);
}

export function validateTask(task: Omit<Task, 'id'>): string | null {
  if (!task.title.trim()) return 'Escribe el nombre de la tarea.';
  if (!task.subject.trim()) return 'Elige una materia.';
  if (!isValidDate(task.dueDate)) return 'Usa una fecha válida con formato AAAA-MM-DD.';
  return null;
}

export function validateClass(entry: Omit<ClassEntry, 'id'>): string | null {
  if (!entry.subject.trim()) return 'Escribe la materia.';
  if (!DAYS.includes(entry.day)) return 'Elige un día válido.';
  if (!isValidTime(entry.startTime) || !isValidTime(entry.endTime)) return 'Usa horas válidas con formato HH:MM.';
  if (entry.startTime >= entry.endTime) return 'La hora de fin debe ser posterior a la hora de inicio.';
  return null;
}

export const initialData: PlannerData = {
  settings: { name: '', accent: 'verde', colorScheme: 'system' },
  tasks: [
    { id: 'demo-1', title: 'Resolver ejercicios de fracciones', subject: 'Matemáticas', dueDate: '2026-10-15', priority: 'Alta', status: 'Pendiente', notes: 'Repasar los ejercicios de la página 42.' },
    { id: 'demo-2', title: 'Preparar exposición del sistema solar', subject: 'Ciencias', dueDate: '2026-10-17', priority: 'Media', status: 'En progreso', notes: '' },
    { id: 'demo-3', title: 'Leer capítulo 3', subject: 'Lengua', dueDate: '2026-10-19', priority: 'Baja', status: 'Completada', notes: '' },
  ],
  classes: [
    { id: 'class-1', subject: 'Matemáticas', day: 'Lunes', startTime: '08:00', endTime: '09:00', room: 'Aula 204' },
    { id: 'class-2', subject: 'Ciencias', day: 'Lunes', startTime: '09:30', endTime: '10:30', room: 'Laboratorio' },
    { id: 'class-3', subject: 'Inglés', day: 'Martes', startTime: '10:00', endTime: '11:00', room: 'Aula 105' },
    { id: 'class-4', subject: 'Historia', day: 'Miércoles', startTime: '08:30', endTime: '09:30', room: 'Aula 301' },
    { id: 'class-5', subject: 'Programación', day: 'Jueves', startTime: '11:00', endTime: '12:30', room: 'Sala de cómputo' },
    { id: 'class-6', subject: 'Arte', day: 'Viernes', startTime: '13:00', endTime: '14:00', room: 'Taller' },
  ],
};
