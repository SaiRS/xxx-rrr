import _ from 'lodash';

/**
 * 根据link和id信息获取对应的self link值
 * @example
 * getSelfLinkFromId('projects', '1') === '/projects/1'
 * getSelfLinkFromId('tasks', '1') === '/tasks/1'
 * @param {string} link 链接的名字
 * @param {string} id id
 * @returns {string} 生成的self link的值
 * @throws Error 当不传参数或者参数类型不是string时，将抛出错误
 */
function getSelfLinkFromId(link: string, id: string): string {
  if (typeof id === 'string') {
    return `/${link}/${id}`;
  } else {
    throw new Error('getSelfLinkFromId::传入的id应为string类型');
  }
}

/**
 * 从link模式和待解析的self中获取对应的id
 * @example getIdFromSelfLink(/\/projects\/(.*)$/, '/projects/1')  === '1'
 * @param {RegExp} link 用来匹配的模式, 如/\/project\/(.*)$/
 * @param {string} self
 * @returns {(string | null)}
 * @throws 当self参数不为string时，抛出异常
 */
function getIdFromSelfLink(link: RegExp, self: string): string | null {
  if (typeof self === 'string') {
    let result = self.match(link);
    if (result) {
      return result[1];
    } else {
      return null;
    }
  } else {
    throw new Error('getIdFromSelfLink::self应该为string类型');
  }
}

/**
 * 从selfLink的值中获取对应的projectId
 * @export
 * @param {string} self
 * @returns {(string | null)}
 */
export const getProjectIdFromSelfLink = _.partial(
  getIdFromSelfLink,
  /\/projects\/(.*)$/,
);

/**
 * 从projectId获得对应的selfLink
 * @export
 * @param {string} projectId
 * @returns {string}
 */
export const getSelfLinkFromProjectId = _.partial(
  getSelfLinkFromId,
  'projects',
);

/**
 * 从selfLink的值中获取对应的projectId
 * @export
 * @param {string} self
 * @returns {(string | null)}
 */
export const getTaskIdFromSelfLink = _.partial(
  getIdFromSelfLink,
  /\/time-entries\/(.*)$/,
);

/**
 * 从taskId获得对应的selfLink
 * @export
 * @param {string} projectId
 * @returns {string}
 */
export const getSelfLinkFromTaskId = _.partial(
  getSelfLinkFromId,
  'time-entries',
);
