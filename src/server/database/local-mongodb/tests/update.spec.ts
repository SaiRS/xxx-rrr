import { getMongoDB } from '../db';
import { testDefaultTestModalCount } from '../models/test-modal';

const modal = 'test-modal';
const prefix = 'test-update';
const new_prefix = 'new-name';

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

function getName(name: string) {
  return `${prefix}:${name}`;
}

beforeEach(async () => {
  let db = getMongoDB();
  let testModal = db.getModel(modal);

  await testModal.deleteMany({ name: new RegExp(prefix) });
  await testModal.deleteMany({ name: new RegExp(new_prefix) });

  let tag1 = testModal.createDocument({
    name: getName('tag-1'),
    order: 1,
  });
  let tag2 = testModal.createDocument({
    name: getName('tag-2'),
    color: '#0f0',
    order: 2,
  });
  let tag3 = testModal.createDocument({
    name: getName('tag-3'),
    color: '#bfb',
    note: 'tag3-note',
    description: 'tag3-description',
    count: testDefaultTestModalCount + 1,
    order: 3,
  });
  let tag4 = testModal.createDocument({
    name: getName('tag-demo'),
    color: '#bcb',
    count: testDefaultTestModalCount + 1,
    list: ['hello', 'world'],
    order: 4,
  });
  let tag5 = testModal.createDocument({
    name: getName('tag-demo'),
    color: '#a00',
    count: testDefaultTestModalCount - 1,
    order: 5,
  });

  await testModal.insertMany([tag1, tag2, tag3, tag4, tag5]);
});

afterEach(async () => {
  let db = getMongoDB();
  let testModal = db.getModel(modal);

  await testModal.deleteMany({ name: new RegExp(prefix) });
  await testModal.deleteMany({ name: new RegExp(new_prefix) });
});

describe('更新数据', () => {
  test('modal.updateMany', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    await testModal.updateMany(
      { name: new RegExp(prefix) },
      {
        name: new_prefix,
      },
    );

    // 查询
    let preCount = await testModal
      .createQuery()
      .equalTo('name', new RegExp(prefix))
      .count();

    let newCount = await testModal
      .createQuery()
      .equalTo('name', new_prefix)
      .count();

    expect(preCount).toBe(0);
    expect(newCount).toBe(5);
  });

  test('modal.updateOne', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    await testModal.updateOne(
      { name: new RegExp(prefix) },
      {
        name: new_prefix,
      },
    );

    // 查询
    let preCount = await testModal
      .createQuery()
      .equalTo('name', new RegExp(prefix))
      .count();

    let newCount = await testModal
      .createQuery()
      .equalTo('name', new_prefix)
      .count();

    expect(preCount).toBe(4);
    expect(newCount).toBe(1);
  });
});
