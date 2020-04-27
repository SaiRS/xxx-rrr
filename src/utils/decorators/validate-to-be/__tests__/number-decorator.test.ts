import { ValidateToBeNumberDecorator } from '../validate-tobe-number-decorator';

class Demo {
  private _count!: number;

  @ValidateToBeNumberDecorator()
  count!: number;

  constructor() {
    this.count = 5;
  }
}

describe('NumberDecorator', () => {
  test('测试ValidateToBeNumberDecorator', () => {
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
