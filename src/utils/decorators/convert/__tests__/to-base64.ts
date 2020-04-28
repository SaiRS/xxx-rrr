import { ToBase64Decorator } from '../to-base64';
import { Base64 } from 'js-base64';

class Demo {
  @ToBase64Decorator()
  cursor!: string;
}

describe('to-base64-convert', () => {
  test('设置字符串类型', () => {
    let demo = new Demo();

    demo.cursor = '1';
    expect(demo.cursor).toBe(Base64.encode('1'));
  });

  test('设置错误的值', () => {
    let demo = new Demo();
    // @ts-ignore
    demo.cursor = 234;
    expect(demo.cursor).toBe(Base64.encode('234'));

    // @ts-ignore
    demo.cursor = undefined;
    expect(demo.cursor).toBe(Base64.encode('undefined'));
  });
});
