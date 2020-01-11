import mongoose from 'mongoose';

// tag schema的定义
export const TagSchemaDefinition: mongoose.SchemaDefinition = {
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#92CFEE',
  },
  note: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
};

// export const TagModal = mongoose.model('tags', TagSchema);
