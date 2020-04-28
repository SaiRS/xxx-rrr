import { getMongoDB } from '../db';
import { IRDocument } from '@server/database/interface-define';

import {
  defaultTagColor,
  defaultTagNote,
  defaultTagDescription,
} from '@server/models';

const prefix = 'test-add';
const modal = 'test-modal';

beforeAll(async (done) => {
  let db = getMongoDB();
  db.init(undefined, () => {
    done();
  });
});

afterAll(() => {
  let db = getMongoDB();
  db.destory();
});

describe('新增数据', () => {
  function getName(name: string) {
    return `${prefix}:${name}`;
  }

  beforeEach(async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);
    await testModal.deleteMany({ name: new RegExp(prefix) });
  });

  afterEach(async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);
    await testModal.deleteMany({ name: new RegExp(prefix) });
  });

  test('default value: document.save', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let tag = testModal.createDocument({
      name: getName('tag-1'),
    });

    let result: IRDocument = await tag.save();

    // result和tag一样
    expect(result).toEqual(tag);
    expect(tag.get('name')).toBe(getName('tag-1'));
    expect(tag.get('color')).toBe(defaultTagColor);
    expect(tag.get('note')).toBe(defaultTagNote);
    expect(tag.get('description')).toBe(defaultTagDescription);
    expect(tag.get('none-description')).toBeUndefined();
  });

  test('modal.insertMany', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let tag1 = testModal.createDocument({
      name: getName('tag-1'),
    });
    let tag2 = testModal.createDocument({
      name: getName('tag-2'),
      color: '#000',
    });
    let tag3 = testModal.createDocument({
      name: getName('tag-3'),
      color: '#bcb',
      note: 'tag3-note',
      description: 'tag3-description',
    });

    let results = await testModal.insertMany([tag1, tag2, tag3]);

    expect(results.length).toBe(3);
    expect(results[0].get('name')).toEqual(getName('tag-1'));
    expect(results[1].get('name')).toEqual(getName('tag-2'));
    expect(results[2].get('name')).toEqual(getName('tag-3'));
    expect(results[1].get('color')).toEqual('#000');
  });
});
