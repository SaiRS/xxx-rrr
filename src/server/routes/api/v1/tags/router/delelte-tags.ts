import { Router, Request, Response } from 'express';
import { getDBModel } from '@server/database/db-factory';
import { IRDocument } from '@server/database/interface-define';
import { tagSerializer } from '@server/serializers';

export function makeDeleteTagsRouter(router: Router): Router {
  router.delete('/:tagId', async function deleteTags(
    req: Request<{ tagId: string }>,
    res: Response,
  ) {
    let tagId = req.params.tagId;

    let modal = getDBModel('tags');
    let query = modal.createQuery();
    let result: IRDocument = await query.equalTo('id', tagId).deleteOne();

    return res.json(tagSerializer(result.toJSON()));
  });

  return router;
}
