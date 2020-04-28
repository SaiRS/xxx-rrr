import { makeGetTagsRouter } from './router/get-tags';
import { makeCreateTagRouter } from './router/create-tag';
import express from 'express';
import { RouterConfig } from '@server/routes';
import { flow } from 'lodash';

const router = express.Router();

export const tagRouter: RouterConfig = {
  path: '/v1/tags',
  router: flow(
    makeGetTagsRouter,
    makeCreateTagRouter,
  )(router),
};
