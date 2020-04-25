import { ValidateToBeColorStringDecorator } from '../validate-tobe-color-decorator';

describe('ColorStringDecorator', () => {
  test('测试ValidateToBeColorStringDecorator', () => {
    class Demo {
      @ValidateToBeColorStringDecorator()
      color: string;

      constructor() {
        this.color = '#ff0000';
      }
    }

    let demo = new Demo();

    expect(demo.color).toBe('#ff0000');

    // 不成功的设置
    demo.color = 'random color';
    expect(demo.color).toBe('#ff0000');

    // 不成功的设置
    // @ts-ignore
    demo.color = {};
    expect(demo.color).toBe('#ff0000');

    // 成功的设置
    demo.color = '#f0f0f0';
    expect(demo.color).toBe('#f0f0f0');
  });
});
