import mongoose from 'mongoose';

interface Tag {
  name: string;
  color: string;
  groupName: string; // 维度，也即是分组
}

// 标签的schema
export const TagSchema = new mongoose.Schema<Tag>(
  {
    name: {
      type: String,
      required: true,
    },
    color: String,
    groupName: String, // 维度，也即是分组
  },
  {
    minimize: false,
  },
);

export const TagModal = mongoose.model('tag', TagSchema);
