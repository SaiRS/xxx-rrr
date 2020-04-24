import 'reflect-metadata';

import { IFTimingTaskNotes } from '../task';

describe('IFTimingTaskNotes', () => {
  test('原始的notes为null', () => {
    // @ts-ignore
    let note = IFTimingTaskNotes.from();

    expect(note).not.toBe(null);
    expect(note.goal).toBe('');
    expect(note.notes).toBe('');
    expect(note.tags.length).toBe(0);
    expect(note.toString()).toBe(`@tags: \n@goal: \n@notes: `);
  });

  test('原始的notes为错误格式的字符串', () => {
    let raw = `EnglishPods36
      EnglishPods37`;

    let note = IFTimingTaskNotes.from(raw);

    expect(note).not.toBe(null);
    expect(note.goal).toBe('');
    expect(note.notes).toBe('');
    expect(note.tags.length).toBe(0);
    expect(note.raw).toBe(raw);
  });

  test('原始的notes为正常格式的字符串(全格式)', () => {
    let raw = `@tags: tag1, tag2, tag3
      @goal: goal-str
      @notes: notes`;

    let note = IFTimingTaskNotes.from(raw);
    expect(note).not.toBe(null);
    expect(note.goal).toBe('goal-str');
    expect(note.notes).toBe('notes');
    expect(note.tags.length).toBe(3);
    expect(note.tags).toEqual(['tag1', 'tag2', 'tag3']);
    expect(note.raw).toBe(raw);
    expect(note.toString()).toBe(
      '@tags: tag1, tag2, tag3\n@goal: goal-str\n@notes: notes',
    );
  });

  test('原始的notes为正常格式的字符串(全格式-乱序)', () => {
    let raw = `@notes: notes @tags: tag1, tag2, tag3
      @goal: goal-str
      `;

    let note = IFTimingTaskNotes.from(raw);
    expect(note).not.toBe(null);
    expect(note.goal).toBe('goal-str');
    expect(note.notes).toBe('notes');
    expect(note.tags.length).toBe(3);
    expect(note.tags).toEqual(['tag1', 'tag2', 'tag3']);
    expect(note.raw).toBe(raw);
    expect(note.toString()).toBe(
      '@tags: tag1, tag2, tag3\n@goal: goal-str\n@notes: notes',
    );
  });

  test('原始的notes为正常格式的字符串(缺少tags)', () => {
    let raw = `
      @goal: goal-str
      @notes: notes`;

    let note = IFTimingTaskNotes.from(raw);
    expect(note).not.toBe(null);
    expect(note.goal).toBe('goal-str');
    expect(note.notes).toBe('notes');
    expect(note.tags.length).toBe(0);
    expect(note.raw).toBe(raw);

    expect(note.toString()).toBe('@tags: \n@goal: goal-str\n@notes: notes');
  });

  test('原始的notes为正常格式的字符串(缺少goal)', () => {
    let raw = `@tags: tag1, tag2, tag3

      @notes: notes`;

    let note = IFTimingTaskNotes.from(raw);
    expect(note).not.toBe(null);
    expect(note.notes).toBe('notes');
    expect(note.tags.length).toBe(3);
    expect(note.tags).toEqual(['tag1', 'tag2', 'tag3']);
    expect(note.raw).toBe(raw);

    expect(note.toString()).toBe(
      '@tags: tag1, tag2, tag3\n@goal: \n@notes: notes',
    );
  });

  test('原始的notes为正常格式的字符串(缺少notes)', () => {
    let raw = `@tags: tag1, tag2, tag3
      @goal: goal-str
      `;

    let note = IFTimingTaskNotes.from(raw);
    expect(note).not.toBe(null);
    expect(note.goal).toBe('goal-str');

    expect(note.tags.length).toBe(3);
    expect(note.tags).toEqual(['tag1', 'tag2', 'tag3']);
    expect(note.raw).toBe(raw);
    expect(note.toString()).toBe(
      '@tags: tag1, tag2, tag3\n@goal: goal-str\n@notes: ',
    );
  });
});
