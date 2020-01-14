import uuid from 'uuid';
import { generateTreeNode, ITreeNode } from './tree-node';

export interface ITag {
  id: string; // 唯一标志符
  name: string; // 名字(名字由groupName/tagName构成)
  color: string; // 颜色

  note: string; // 备注
  description: string; // 描述

  // creatorId: string; // 创建者id
}

export function generateTag(opt: Partial<ITag> = {}): ITag {
  let defaultTag = {
    id: uuid(),
    name: '',
    color: '',
    note: '',
    description: '',
  };
  return {
    ...defaultTag,
    ...opt,
  };
}

/**
 * 获取tag显示的名称（最后一个/之后的部分）
 * @description 主要用于在树状结构中的显示
 * @exports
 * 'prefix/name' -> name
 * name -> name
 * 'pre/pre/name' -> name
 * @export
 * @param {ITag} tag 标签信息
 * @returns {string} 名字
 */
export function getDisplayName(tag: ITag): string {
  let fullName = tag.name;
  let displayName =
    fullName.lastIndexOf('/') !== -1
      ? fullName.slice(fullName.lastIndexOf('/') + 1)
      : fullName;

  return displayName;
}

/**
 * 获取标签名字的维度（最后一个/之前的部分)
 *  @exports
 * 'prefix/name' -> prefix
 *  name -> name
 * 'pre/pre/name' -> pre/pre
 * @export
 * @param {ITag} tag 标签信息
 * @returns {string} 维度信息
 */
export function getDemensionPath(tag: ITag): string {
  let index = tag.name.lastIndexOf('/');
  if (-1 === index) {
    return '';
  } else {
    return tag.name.slice(0, index);
  }
}

export function convertTagListToTagNodes(
  tags: ITag[],
): ITreeNode<ITag | null>[] {
  let dirMap: { [key: string]: ITreeNode<ITag | null> } = {};

  let result: ITreeNode<ITag | null>[] = [];
  for (let tag of tags) {
    // 路径
    let demension = getDemensionPath(tag);

    // 名字
    let name = getDisplayName(tag);

    if (!demension) {
      let node = generateTreeNode(name, tag);
      result.push(node);
    } else {
      let node = generateTreeNode(name, tag);

      let demensionSegments = demension.split('/');

      let index = 0;
      let parent = null;

      // 从头开始寻找
      while (index < demensionSegments.length) {
        let path = demensionSegments.slice(0, index + 1).join('/');

        let parentNode = dirMap[path];
        if (parentNode) {
          if (index === demensionSegments.length - 1) {
            parentNode.children.push(node);
          }

          parent = parentNode;
        } else {
          let ppNode = generateTreeNode(demensionSegments[index], null);
          // // 没有找到
          if (!parent) {
            result.push(ppNode);
          } else {
            parent.children.push(ppNode);
          }
          dirMap[path] = ppNode;

          if (index === demensionSegments.length - 1) {
            ppNode.children.push(node);
          }

          parent = ppNode;
        }

        index++;
      }
    }
  }

  return result;
}
