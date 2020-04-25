import { _IBTimingProject, _IBTimingProjectProfile } from './project-types';
import { IFTimingProject, IFTimingProjectProfile } from '@root/src/types';
import { getProjectIdFromSelfLink } from './utils';
import {
  validateToBeArray,
  validateToBeBoolean,
  validateToBeString,
  validateToBeNumber,
} from '@root/src/utils';

/**
 * 将timing返回的项目信息转换成Timing Project
 * 如果解析失败，则为null
 * @export
 * @param {_IBTimingProject} bInfo
 * @returns {IFTimingProject | null}
 */
export function createTimgProjectFactory(
  bInfo: _IBTimingProject,
): IFTimingProject | null {
  let id = getProjectIdFromSelfLink(bInfo.self);
  if (id === null) {
    return null;
  }

  let project = new IFTimingProject();
  // 设置值
  project.id = id;
  project.is_archived = bInfo.is_archived;
  project.title = bInfo.title;
  project.productivity_score = bInfo.productivity_score;
  project.color = bInfo.color;
  project.parentId = bInfo.parent
    ? getProjectIdFromSelfLink(bInfo.parent.self)
    : null;
  project.children = validateToBeArray<_IBTimingProjectProfile>(
    bInfo.children,
    [],
  )
    .map(createTimingProjectProfileFactory)
    .filter(function filter(item): item is IFTimingProjectProfile {
      return !!item;
    });

  return project;
}

/**
 * 将timing返回的项目profile信息转换成Timing Project Profile
 * @export
 * @param {_IBTimingProjectProfile} bInfo
 * @returns {IFTimingProjectProfile | null}
 */
export function createTimingProjectProfileFactory(
  bInfo: _IBTimingProjectProfile,
): IFTimingProjectProfile | null {
  let id = getProjectIdFromSelfLink(bInfo.self);
  if (id !== null) {
    let project = new IFTimingProjectProfile();
    project.id = id;
    return project;
  } else {
    return null;
  }
}
