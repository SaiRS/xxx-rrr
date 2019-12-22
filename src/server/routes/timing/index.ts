import express from 'express';
import { RouterConfig } from '@server/routes';
import { flow } from 'lodash';
import { makeTimingGetHierarchyProjectsRouter } from './projects/get-hierarchy-projects';
import { makeTimingGetListProjectsRouter } from './projects/get-list-projects';
import { makeTimingGetProjectDetailRouter } from './projects/get-project-detail';
import { makeTimingGetListTasksRouter } from './tasks/get-list-tasks';
import { makeTimingGetTaskDetailRouter } from './tasks/get-task-detail';

const router = express.Router();

export const tagRouter: RouterConfig = {
  path: '/v1/timing',
  router: flow(
    makeTimingGetHierarchyProjectsRouter,
    makeTimingGetListProjectsRouter,
    makeTimingGetProjectDetailRouter,
    makeTimingGetListTasksRouter,
    makeTimingGetTaskDetailRouter,
  )(router),
};
