import mongoose from 'mongoose';

interface Tag {
  name: string;
}

// 标签的schema
export const TagSchema = new mongoose.Schema<Tag>({
  name: String,
});

export const TagModal = mongoose.model('tag', TagSchema);
