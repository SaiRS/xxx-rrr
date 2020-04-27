import { ValidateToBeStringDecorator } from '../validate-tobe-string-decorator';

class Demo {
  private _title!: string;

  @ValidateToBeStringDecorator()
  title!: string;

  constructor() {
    this.title = 'hello';
  }
}

describe('StringDecorator', () => {
  test('测试ValidateToBeStringDecorator', () => {
    let demo = new Demo();
    expect(demo.title).toBe('hello');
    // 不成功的设置
    // @ts-ignore
    demo.title = undefined;
    expect(demo.title).toBe('hello');
    // 不成功的设置
    // @ts-ignore
    demo.title = {};
    expect(demo.title).toBe('hello');
    // 成功的设置
    demo.title = 'new title';
    expect(demo.title).toBe('new title');
  });
});
