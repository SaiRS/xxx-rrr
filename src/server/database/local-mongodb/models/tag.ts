import mongoose from 'mongoose';

export const defaultTagColor = '#92CFEE';
export const defaultTagNote = '';
export const defaultTagDescription = '';

// tag schema的定义
export const TagSchemaDefinition: mongoose.SchemaDefinition = {
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
};

// export const TagModal = mongoose.model('tags', TagSchema);
