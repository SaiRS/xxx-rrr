import { ValidateToBeNumberDecorator } from '../validate-tobe-number-decorator';

describe('StringDecorator', () => {
  test('测试ValidateToBeStringDecorator', () => {
    class Demo {
      @ValidateToBeNumberDecorator()
      count: number;

      constructor() {
        this.count = 5;
      }
    }

    let demo = new Demo();

    expect(demo.count).toBe(5);

    // 不成功的设置
    // @ts-ignore
    demo.count = undefined;
    expect(demo.count).toBe(5);

    // 不成功的设置
    // @ts-ignore
    demo.count = {};
    expect(demo.count).toBe(5);

    // 成功的设置
    demo.count = 1;
    expect(demo.count).toBe(1);
  });
});
