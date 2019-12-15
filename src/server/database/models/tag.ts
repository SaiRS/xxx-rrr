import mongoose, { Schema } from 'mongoose';

export interface ITag {
  id: string;
  name: string;
  color: string;
  groupName: string; // 维度，也即是分组,
  parent?: ITag;
}

// 标签的schema
export const TagSchema = new mongoose.Schema<ITag>(
  {
    name: {
      type: String,
      required: true,
    },
    color: String,
    groupName: String, // 维度，也即是分组
    parentId: {
      // 指向父tag的id
      type: Schema.Types.ObjectId,
      ref: 'tags',
      default: null,
    },
  },
  {
    minimize: false,
  },
);

export const TagModal = mongoose.model('tags', TagSchema);
