import mongoose from 'mongoose';
import { defaultTagColor, defaultTagNote, defaultTagDescription } from './tag';
// import { number } from 'yup';

export const testDefaultTestModalCount = 3;
export const testDefaultTestModalListItem = 'demo';

// NOTE: 我们使用Tag的定义，并在此基础上添加一些其他的属性
// 之前测试是使用tags来测试的，为了复用之前的测试用例，故此操作
export const TestSchemaDefinition: mongoose.SchemaDefinition = {
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: defaultTagColor,
  },
  note: {
    type: String,
    default: defaultTagNote,
  },
  description: {
    type: String,
    default: defaultTagDescription,
  },

  /************** 额外添加的 ******************/

  // 数字
  count: {
    type: Number,
    default: testDefaultTestModalCount,
  },

  // 数组
  list: {
    type: Array,
    default: [testDefaultTestModalListItem],
  },

  order: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },

  updatedAt: {
    type: Date,
    default: new Date(),
  },
};
