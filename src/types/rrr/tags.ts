export interface ITag {
  id: string; // 唯一标志符
  name: string; // 名字(名字由groupName/tagName构成)
  color: string; // 颜色

  note: string; // 备注
  description: string; // 描述

  projectId: string; // 所属的项目id
  creatorId: string; // 创建者id
}
