import { tagsRouter } from './tags-route';
import express from 'express';
import { RouterConfig } from '@server/routes';
const router = express.Router();

export const tagRouter: RouterConfig = {
  path: '/v1/tags',
  router: tagsRouter(router),
};
