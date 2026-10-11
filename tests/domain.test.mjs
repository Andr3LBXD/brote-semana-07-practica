import test from 'node:test';
import assert from 'node:assert/strict';
import { initialData, isPlannerData, isValidDate, isValidTime, validateClass, validateTask } from '../src/lib/types.ts';

test('date and time validators reject impossible calendar values and clock times', () => {
  assert.equal(isValidDate('2024-02-29'), true);
  assert.equal(isValidDate('2025-02-29'), false);
  assert.equal(isValidDate('2025-13-01'), false);
  assert.equal(isValidTime('23:59'), true);
  assert.equal(isValidTime('24:00'), false);
  assert.equal(isValidTime('09:60'), false);
});

test('task validation requires a title, subject, and real due date', () => {
  const task = { title: 'Entregar informe', subject: 'Ciencias', dueDate: '2026-10-15', priority: 'Alta', status: 'Pendiente', notes: '' };
  assert.equal(validateTask(task), null);
  assert.equal(validateTask({ ...task, title: '  ' }), 'Escribe el nombre de la tarea.');
  assert.match(validateTask({ ...task, dueDate: '2026-02-30' }), /fecha válida/);
});

test('class validation requires a valid day and a strictly increasing time range', () => {
  const entry = { subject: 'Matemáticas', day: 'Lunes', startTime: '08:00', endTime: '09:00', room: '' };
  assert.equal(validateClass(entry), null);
  assert.match(validateClass({ ...entry, endTime: '08:00' }), /posterior/);
  assert.match(validateClass({ ...entry, startTime: '25:00' }), /horas válidas/);
  assert.match(validateClass({ ...entry, day: 'Funday' }), /día válido/);
});

test('persisted planner schema rejects damaged or partially shaped records', () => {
  assert.equal(isPlannerData(initialData), true);
  assert.equal(isPlannerData({ ...initialData, tasks: { bad: true } }), false);
  assert.equal(isPlannerData({ ...initialData, settings: { ...initialData.settings, accent: 'blue' } }), false);
  assert.equal(isPlannerData({ ...initialData, classes: [{ ...initialData.classes[0], endTime: '07:30' }] }), false);
});
