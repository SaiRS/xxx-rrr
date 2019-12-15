import { Router, Request, Response } from 'express';

export function makeDeleteTagsRouter(router: Router): Router {
  router.delete('/', async function deleteTags(req: Request, res: Response) {});

  return router;
}
