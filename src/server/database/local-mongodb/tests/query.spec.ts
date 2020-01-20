import { getMongoDB } from '../db';
import { IRDocument } from '@server/database/interface-define';

import {
  defaultTagColor,
  defaultTagNote,
  defaultTagDescription,
} from '../models';
import mongoose from 'mongoose';
import {
  testDefaultTestModalCount,
  testDefaultTestModalListItem,
} from '../models/test-modal';

const prefix = 'test-query';
const modal = 'test-modal';

function getName(name: string) {
  return `${prefix}:${name}`;
}

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

let results: IRDocument[] = [];
let tag1JSON = {
  name: getName('tag-1'),
  color: defaultTagColor,
  note: defaultTagNote,
  description: defaultTagDescription,
  count: testDefaultTestModalCount,
  list: [testDefaultTestModalListItem],
  order: 1,
};

let tag2JSON = {
  name: getName('tag-2'),
  color: '#000',
  note: defaultTagNote,
  description: defaultTagDescription,
  count: testDefaultTestModalCount,
  list: [testDefaultTestModalListItem],
  order: 2,
};

let tag3JSON = {
  name: getName('tag-3'),
  color: '#bbb',
  note: 'tag3-note',
  description: 'tag3-description',
  count: testDefaultTestModalCount + 1,
  list: [testDefaultTestModalListItem],
  order: 3,
};

let tag4JSON = {
  name: getName('tag-demo'),
  color: '#bbb',
  note: defaultTagNote,
  description: defaultTagDescription,
  count: testDefaultTestModalCount + 1,
  list: ['hello', 'world'],
  order: 4,
};

let tag5JSON = {
  name: getName('tag-demo'),
  color: '#000',
  note: defaultTagNote,
  description: defaultTagDescription,
  count: testDefaultTestModalCount - 1,
  list: [testDefaultTestModalListItem],
  order: 5,
};

beforeEach(async () => {
  let db = getMongoDB();
  let testModal = db.getModel(modal);

  await testModal.deleteMany({ name: new RegExp(prefix) });

  let tag1 = testModal.createDocument({
    name: getName('tag-1'),
    order: 1,
  });
  let tag2 = testModal.createDocument({
    name: getName('tag-2'),
    color: '#000',
    order: 2,
  });
  let tag3 = testModal.createDocument({
    name: getName('tag-3'),
    color: '#bbb',
    note: 'tag3-note',
    description: 'tag3-description',
    count: testDefaultTestModalCount + 1,
    order: 3,
  });
  let tag4 = testModal.createDocument({
    name: getName('tag-demo'),
    color: '#bbb',
    count: testDefaultTestModalCount + 1,
    list: ['hello', 'world'],
    order: 4,
  });
  let tag5 = testModal.createDocument({
    name: getName('tag-demo'),
    color: '#000',
    count: testDefaultTestModalCount - 1,
    order: 5,
  });

  results = await testModal.insertMany([tag1, tag2, tag3, tag4, tag5]);
});

afterEach(async () => {
  let db = getMongoDB();
  let testModal = db.getModel(modal);

  await testModal.deleteMany({ name: new RegExp(prefix) });
});

describe('modal查询数据', () => {
  test('modal.find exist', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let results = await testModal.find({
      color: '#bbb',
    });

    expect(results.length).toEqual(2);
    expect(results[0].get('name')).toEqual(getName('tag-3'));
    expect(results[0].get('color')).toEqual('#bbb');
    expect(results[0].get('note')).toEqual('tag3-note');
    expect(results[0].get('description')).toEqual('tag3-description');
  });

  test('modal.find not exist', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let results = await testModal.find({
      name: /no-exist/i,
      color: {
        $ne: '#ffe',
      },
    });

    expect(results.length).toEqual(0);
  });

  test('modal.findById not exist', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    // @ts-ignore
    let result = await testModal.findById(new mongoose.Types.ObjectId());
    expect(result).toBeNull();
  });

  test('modal.findById with error id', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    expect.assertions(1);
    return expect(testModal.findById('error-object-id')).rejects.toThrowError();
  });

  test('model.findById exist', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let result = await testModal.findById(results[0].id);

    expect(result).not.toBeNull();
    expect(result!.id).toEqual(results[0].id);
    expect(result!.get('name')).toEqual(getName('tag-1'));
    expect(result!.get('color')).toEqual(defaultTagColor);
    expect(result!.get('note')).toEqual(defaultTagNote);
    expect(result!.get('description')).toEqual(defaultTagDescription);
  });

  test('modal.findOne exist', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let result = await testModal.findOne({
      note: defaultTagNote,
    });

    expect(result).not.toBeNull();
    expect(result!.get('name')).toEqual(getName('tag-1'));
    expect(result!.get('color')).toEqual(defaultTagColor);
    expect(result!.get('note')).toEqual(defaultTagNote);
    expect(result!.get('description')).toEqual(defaultTagDescription);
  });

  test('modal.findOne not exist', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let result = await testModal.findOne({
      note: 'not-exist note',
    });

    expect(result).toBeNull();
  });
});

describe('query查询数据', () => {
  test('query equal to', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let query = testModal.createQuery();
    let results = await query.equalTo('name', getName('tag-demo')).find();

    expect(results.length).toBe(2);
    expect(results[0].get('name')).toBe(getName('tag-demo'));
    expect(results[1].get('name')).toBe(getName('tag-demo'));
    expect(results[0].get('color')).toBe('#bbb');
    expect(results[1].get('color')).toBe('#000');
  });

  test('query not equal to', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let query = testModal.createQuery();
    let results = await query.notEqualTo('name', getName('tag-demo')).find();

    expect(results.length).toBe(3);
    expect(results[0].get('name')).toBe(getName('tag-1'));
    expect(results[1].get('name')).toBe(getName('tag-2'));
    expect(results[2].get('name')).toBe(getName('tag-3'));
  });

  test('query not greatThanOrEqualTo', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let query = testModal.createQuery();
    let results = await query
      .greatThanOrEqualTo('count', testDefaultTestModalCount)
      .find();

    expect(results.length).toBe(4);
    expect(results[0].get('name')).toBe(getName('tag-1'));
    expect(results[1].get('name')).toBe(getName('tag-2'));
    expect(results[2].get('name')).toBe(getName('tag-3'));
    expect(results[3].get('name')).toBe(getName('tag-demo'));
    expect(results[3].get('count')).toBe(testDefaultTestModalCount + 1);
  });

  test('query not greatThan', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let query = testModal.createQuery();
    let results = await query
      .greatThan('count', testDefaultTestModalCount)
      .find();

    expect(results.length).toBe(2);
    expect(results[0].toJSONWithoutId()).toMatchObject(tag3JSON);
    expect(results[1].toJSONWithoutId()).toMatchObject(tag4JSON);
  });

  test('query lessThanOrEqualTo', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let query = testModal.createQuery();
    let results = await query
      .lessThanOrEqualTo('count', testDefaultTestModalCount)
      .find();

    expect(results.length).toBe(3);
    expect(results[0].toJSONWithoutId()).toMatchObject(tag1JSON);
    expect(results[1].toJSONWithoutId()).toMatchObject(tag2JSON);
    expect(results[2].toJSONWithoutId()).toMatchObject(tag5JSON);
  });

  test('query lessThan', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let query = testModal.createQuery();
    let results = await query
      .lessThan('count', testDefaultTestModalCount)
      .find();

    expect(results.length).toBe(1);
    expect(results[0].toJSONWithoutId()).toMatchObject(tag5JSON);
  });

  test('query startWith', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let query = testModal.createQuery();
    let results = await query.startWith('name', prefix).find();

    expect(results.length).toBe(5);
    expect(results[0].toJSONWithoutId()).toMatchObject(tag1JSON);
    expect(results[1].toJSONWithoutId()).toMatchObject(tag2JSON);
    expect(results[2].toJSONWithoutId()).toMatchObject(tag3JSON);
    expect(results[3].toJSONWithoutId()).toMatchObject(tag4JSON);
    expect(results[4].toJSONWithoutId()).toMatchObject(tag5JSON);
  });

  test('query endsWith', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let query = testModal.createQuery();
    let results = await query.endsWith('name', 'demo').find();

    expect(results.length).toBe(2);
    expect(results[0].toJSONWithoutId()).toMatchObject(tag4JSON);
    expect(results[1].toJSONWithoutId()).toMatchObject(tag5JSON);
  });

  test('query contains', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let query = testModal.createQuery();
    let results = await query.contains('name', 'g-').find();

    expect(results.length).toBe(5);
    expect(results[0].toJSONWithoutId()).toMatchObject(tag1JSON);
    expect(results[1].toJSONWithoutId()).toMatchObject(tag2JSON);
    expect(results[2].toJSONWithoutId()).toMatchObject(tag3JSON);
    expect(results[3].toJSONWithoutId()).toMatchObject(tag4JSON);
    expect(results[4].toJSONWithoutId()).toMatchObject(tag5JSON);
  });

  test('query matches', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let query = testModal.createQuery();
    let results = await query.matches('name', /ag-/).find();

    expect(results.length).toBe(5);
    expect(results[0].toJSONWithoutId()).toMatchObject(tag1JSON);
    expect(results[1].toJSONWithoutId()).toMatchObject(tag2JSON);
    expect(results[2].toJSONWithoutId()).toMatchObject(tag3JSON);
    expect(results[3].toJSONWithoutId()).toMatchObject(tag4JSON);
    expect(results[4].toJSONWithoutId()).toMatchObject(tag5JSON);
  });

  test('query notContainedIn', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let query = testModal.createQuery();
    let results = await query
      .notContainedIn('list', [testDefaultTestModalListItem])
      .find();

    expect(results.length).toBe(1);
    expect(results[0].toJSONWithoutId()).toMatchObject(tag4JSON);
  });

  test('query containedIn', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let query = testModal.createQuery();
    let results = await query.containedIn('list', ['hello', 'random']).find();

    expect(results.length).toBe(1);
    expect(results[0].toJSONWithoutId()).toMatchObject(tag4JSON);
  });

  test('query exists', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let query = testModal.createQuery();
    let results = await query.exists('note-none').find();

    expect(results.length).toBe(0);
  });

  test('query notExist', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let query = testModal.createQuery();
    let results = await query.notExist('note-none').find();

    expect(results.length).toBe(5);
  });

  test('query descending', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let query = testModal.createQuery();
    let results = await query
      .notExist('note-none')
      .descending('order')
      .find();

    expect(results.length).toBe(5);
    expect(results[0].toJSONWithoutId()).toMatchObject(tag5JSON);
    expect(results[1].toJSONWithoutId()).toMatchObject(tag4JSON);
    expect(results[2].toJSONWithoutId()).toMatchObject(tag3JSON);
    expect(results[3].toJSONWithoutId()).toMatchObject(tag2JSON);
    expect(results[4].toJSONWithoutId()).toMatchObject(tag1JSON);
  });

  test('query ascending', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let query = testModal.createQuery();
    let results = await query
      .notExist('note-none')
      .ascending('order')
      .find();

    expect(results.length).toBe(5);
    expect(results[0].toJSONWithoutId()).toMatchObject(tag1JSON);
    expect(results[1].toJSONWithoutId()).toMatchObject(tag2JSON);
    expect(results[2].toJSONWithoutId()).toMatchObject(tag3JSON);
    expect(results[3].toJSONWithoutId()).toMatchObject(tag4JSON);
    expect(results[4].toJSONWithoutId()).toMatchObject(tag5JSON);
  });

  test('query includes', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let query = testModal.createQuery();
    let results = await query.includes(['order', 'name']).find();

    expect(results.length).toBe(5);
    expect(results[0].toJSONWithoutId()).toEqual({
      name: getName('tag-1'),
      order: 1,
    });
    expect(results[1].toJSONWithoutId()).toEqual({
      name: getName('tag-2'),
      order: 2,
    });
    expect(results[2].toJSONWithoutId()).toEqual({
      name: getName('tag-3'),
      order: 3,
    });
    expect(results[3].toJSONWithoutId()).toEqual({
      name: getName('tag-demo'),
      order: 4,
    });
    expect(results[4].toJSONWithoutId()).toEqual({
      name: getName('tag-demo'),
      order: 5,
    });
  });

  test('query ascending', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let query = testModal.createQuery();
    let results = await query.limit(2).find();

    expect(results.length).toBe(2);
    expect(results[0].toJSONWithoutId()).toMatchObject(tag1JSON);
    expect(results[1].toJSONWithoutId()).toMatchObject(tag2JSON);
  });

  test('query skip', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let query = testModal.createQuery();
    let results = await query
      .startWith('name', prefix)
      .skip(2)
      .find();

    expect(results.length).toBe(3);
    expect(results[0].toJSONWithoutId()).toMatchObject(tag3JSON);
    expect(results[1].toJSONWithoutId()).toMatchObject(tag4JSON);
    expect(results[2].toJSONWithoutId()).toMatchObject(tag5JSON);
  });

  test('find one', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let query = testModal.createQuery();
    let result = await query.skip(2).findOne();
    expect(result).not.toBeNull();
    expect(result!.toJSONWithoutId()).toMatchObject(tag3JSON);
  });

  test('find count', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let query = testModal.createQuery();
    let result = await query.count();
    expect(result).toBe(5);
  });

  test('find skip count', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let query = testModal.createQuery();
    let result = await query.skip(2).count();
    expect(result).toBe(3);
  });
});

describe('测试逻辑查询', () => {
  test('and', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let query1 = testModal.createQuery();
    query1.equalTo('color', '#000');

    let query2 = testModal.createQuery();
    query2.equalTo('order', 5);

    let query = query1.and(query2);

    let results = await query.find();

    expect(results.length).toBe(1);
    expect(results[0].toJSONWithoutId()).toMatchObject(tag5JSON);
  });

  test('or', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let query1 = testModal.createQuery();
    query1.equalTo('color', '#000');

    let query2 = testModal.createQuery();
    query2.equalTo('color', defaultTagColor);

    let query = query1.or(query2);

    let results = await query.ascending('order').find();

    expect(results.length).toBe(3);
    expect(results[0].toJSONWithoutId()).toMatchObject(tag1JSON);
    expect(results[1].toJSONWithoutId()).toMatchObject(tag2JSON);
    expect(results[2].toJSONWithoutId()).toMatchObject(tag5JSON);
  });

  test('not', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    let query1 = testModal.createQuery();
    query1.equalTo('color', '#000');

    let query = query1.not();

    let results = await query.ascending('order').find();

    expect(results.length).toBe(3);
    expect(results[0].toJSONWithoutId()).toMatchObject(tag1JSON);
    expect(results[1].toJSONWithoutId()).toMatchObject(tag3JSON);
    expect(results[2].toJSONWithoutId()).toMatchObject(tag4JSON);
  });
});
