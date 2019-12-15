import { Router, Request, Response } from 'express';

export function makeUpdateTagsRouter(router: Router): Router {
  router.patch('/', async function updateTags(req: Request, res: Response) {});

  return router;
}
