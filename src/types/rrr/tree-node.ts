import uuid from 'uuid';

export interface ITreeNode<V = any, C = any> {
  uuid: string;
  name: string;

  value: V;

  children: ITreeNode<C>[];
}

export function generateTreeNode<T = any, C = any>(
  name: string,
  value: T,
  children?: ITreeNode<C>[],
): ITreeNode<T, C> {
  return {
    uuid: uuid(),
    name: name,
    value: value,
    children: children ? children : [],
  };
}
