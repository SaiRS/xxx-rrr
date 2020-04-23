import { Router, Response, Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import { Serializer, Error as SerializerError } from 'jsonapi-serializer';
import { SLogger } from '@sutils/logger';
import uuid from 'uuid';
import { timingRequest } from '../base';
import { IFTimingProject } from '@root/src/types';

interface IParam extends ParamsDictionary {
  projectId: string;
}

/**
 * 获取项目详情
 * @export
 * @param {Router} router
 * @returns {Router}
 */
export async function getTimingProjectDetail(
  projectId: string,
): Promise<IFTimingProject> {
  return await timingRequest
    .get<{ data: IFTimingProject }>(`/projects/${projectId}`)
    .then((response) => {
      // 直接返回
      return response.data.data;
    });
}
