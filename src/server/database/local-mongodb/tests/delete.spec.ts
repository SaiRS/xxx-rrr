import { getMongoDB } from '../db';
import { IRDocument } from '@server/database/interface-define';
import { SLogger } from '@sutils/logger';
import {
  defaultTagColor,
  defaultTagNote,
  defaultTagDescription,
} from '../models';

beforeAll(async (done) => {
  let db = getMongoDB();
  db.init(undefined, (error) => {
    done(error);
  });
});

afterAll(() => {
  let db = getMongoDB();
  db.destory();
});

describe('删除数据', () => {
  const prefix = 'test';

  function getName(name: string) {
    return `${prefix}:${name}`;
  }

  beforeEach(async () => {
    let db = getMongoDB();
    let tagsModal = db.getModel('tags');

    let tag1 = tagsModal.createDocument({
      name: getName('tag-1'),
    });
    let tag2 = tagsModal.createDocument({
      name: getName('tag-2'),
      color: '#000',
    });
    let tag3 = tagsModal.createDocument({
      name: getName('tag-3'),
      color: '#bbb',
      note: 'tag3-note',
      description: 'tag3-description',
    });

    await tagsModal.insertMany([tag1, tag2, tag3]);
  });

  afterEach(async () => {
    let db = getMongoDB();
    let tagsModal = db.getModel('tags');
    return tagsModal.deleteMany({ name: /test:/ });
  });

  test('document.delete', async () => {
    let db = getMongoDB();
    let tagsModal = db.getModel('tags');

    let tag = tagsModal.createDocument({
      name: getName('tag-1'),
    });

    let result: IRDocument = await tag.save();
  });

  test('modal.deleteMany', async () => {
    let db = getMongoDB();
    let tagsModal = db.getModel('tags');

    let tag1 = tagsModal.createDocument({
      name: getName('tag-1'),
    });
    let tag2 = tagsModal.createDocument({
      name: getName('tag-2'),
      color: '#000',
    });
    let tag3 = tagsModal.createDocument({
      name: getName('tag-3'),
      color: '#bbb',
      note: 'tag3-note',
      description: 'tag3-description',
    });

    let results = await tagsModal.insertMany([tag1, tag2, tag3]);

    expect(results.length).toBe(3);
    console.log(results[0].toJSON());
    expect(results[0].get('name')).toEqual(getName('tag-1'));
    expect(results[1].get('name')).toEqual(getName('tag-2'));
    expect(results[2].get('name')).toEqual(getName('tag-3'));
    expect(results[1].get('color')).toEqual('#000');
  });
});
