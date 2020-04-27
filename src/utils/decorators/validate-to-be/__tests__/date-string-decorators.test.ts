import { ValidateToBeDateStringDecorator } from '../validate-tobe-date-string-decorator';
import dayjs from 'dayjs';

class Demo {
  private _date!: string;

  @ValidateToBeDateStringDecorator()
  date!: string;
}

describe('date-string-decorator', () => {
  test('ISO时间格式', () => {
    let demo = new Demo();
    // 时区
    let zone = new Date().getTimezoneOffset() / -60;
    if (Math.abs(zone) < 10) {
      // @ts-ignore
      zone = '0' + zone;
    }
    let date = dayjs(new Date(2020, 1, 1, 11, 11, 11, 11));
    demo.date = date.format('YYYY-MM-DDTHH:mm:ssZ'); //'2019-01-01T00:00:00+00:00';
    expect(demo.date).toBe(`2020-02-01T11:11:11+${zone}:00`);
  });
  test('不符合ISO规范时间格式', () => {
    let demo1 = new Demo();
    expect(demo1.date).toBe(undefined);
  });
});
