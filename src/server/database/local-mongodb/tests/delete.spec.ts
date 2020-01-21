import { getMongoDB } from '../db';
import { testDefaultTestModalCount } from '../models/test-modal';

const modal = 'test-modal';
const prefix = 'test-delete';

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
  function getName(name: string) {
    return `${prefix}:${name}`;
  }

  test('dddd', () => {
    expect(1).toBe(1);
  });

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
      order: 2,
    });
    let tag3 = testModal.createDocument({
      name: getName('tag-3'),
      note: 'tag3-note',
      description: 'tag3-description',
      count: testDefaultTestModalCount + 1,
      order: 3,
    });
    let tag4 = testModal.createDocument({
      name: getName('tag-demo'),
      count: testDefaultTestModalCount + 1,
      list: ['hello', 'world'],
      order: 4,
    });
    let tag5 = testModal.createDocument({
      name: getName('tag-demo'),
      count: testDefaultTestModalCount - 1,
      order: 5,
    });

    await testModal.insertMany([tag1, tag2, tag3, tag4, tag5]);
  });

  afterEach(async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    await testModal.deleteMany({ name: new RegExp(prefix) });
  });

  test('modal.deleteMany', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    await testModal.deleteMany({
      name: new RegExp(prefix),
    });

    // 查询
    let result = await testModal
      .createQuery()
      .equalTo('name', RegExp(prefix))
      .count();
    expect(result).toBe(0);
  });

  test('modal.deleteOne', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    await testModal.deleteOne({
      name: new RegExp(prefix),
    });

    // 查询
    let result = await testModal
      .createQuery()
      .equalTo('name', RegExp(prefix))
      .count();
    expect(result).toBe(4);
  });

  test('query.deleteOne', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    await testModal
      .createQuery()
      .equalTo('name', new RegExp(prefix))
      .deleteOne();

    // 查询
    let result = await testModal
      .createQuery()
      .equalTo('name', RegExp(prefix))
      .count();
    expect(result).toBe(4);
    expect(1).toBe(1);
  });

  test('query.delete', async () => {
    let db = getMongoDB();
    let testModal = db.getModel(modal);

    await testModal
      .createQuery()
      .equalTo('name', new RegExp(prefix))
      .delete();

    // 查询
    let result = await testModal
      .createQuery()
      .equalTo('name', RegExp(prefix))
      .count();
    expect(result).toBe(0);
  });
});
