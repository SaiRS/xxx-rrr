import { ValidateToBeBooleanDecorator } from '../validate-tobe-boolean-decorator';

class Demo {
  @ValidateToBeBooleanDecorator()
  isRight!: boolean;

  constructor() {
    this.isRight = false;
  }
}

describe('Boolean Decorator', () => {
  test('测试ValidateToBeBooleanDecorator', () => {
    let demo = new Demo();
    expect(demo.isRight).toBe(false);
    // 不成功的设置
    // @ts-ignore
    demo.isRight = undefined;
    expect(demo.isRight).toBe(false);
    // 不成功的设置
    // @ts-ignore
    demo.isRight = {};
    expect(demo.isRight).toBe(false);
    // 成功的设置
    demo.isRight = true;
    expect(demo.isRight).toBe(true);
  });
});
