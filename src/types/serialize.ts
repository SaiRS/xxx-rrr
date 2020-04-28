import { XXXStream } from './stream';

export interface ISerialize {
  serialize(context: XXXStream): void;
  deserialize<R>(context: XXXStream): R;
}
