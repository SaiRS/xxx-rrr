import { Serializer, SerializerOptions } from 'jsonapi-serializer';

const TagsSerializer = new Serializer('tags', { attributes: ['name'] });

export function tagSerializer(
  tag: Record<string, any>,
  options: SerializerOptions = {},
) {
  return TagsSerializer.serialize(tag);
}
