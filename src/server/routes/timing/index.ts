import express from 'express';
import { RouterConfig } from '@server/routes';
import { flow } from 'lodash';
import { makeTimingGetHierarchyProjectsRouter } from './projects/get-hierarchy-projects';

const router = express.Router();

export const tagRouter: RouterConfig = {
  path: '/v1/timing',
  router: flow(makeTimingGetHierarchyProjectsRouter)(router),
};
