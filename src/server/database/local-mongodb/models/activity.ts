// 活动

export interface IActivity {
  id: string; // 唯一标志符
  name: string; // 名字

  //
  startDate: string;
  endDate: string;

  score: number; // 得分情况

  note: string; // 备注
  description: string; // 描述
}
