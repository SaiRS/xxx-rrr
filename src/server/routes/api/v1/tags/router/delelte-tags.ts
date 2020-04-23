import { Router, Request, Response } from 'express';
import { getTagsModal } from '@server/database/db-factory';
import { IRDocument } from '@server/database/interface-define';
import { tagSerializer } from '@sutils/serializer';

export function makeDeleteTagsRouter(router: Router): Router {
  router.delete('/:tagId', async function deleteTags(
    req: Request<{ tagId: string }>,
    res: Response,
  ) {
    let tagId = req.params.tagId;

    let modal = getTagsModal();
    let query = modal.createQuery();
    let result: IRDocument | null = await query
      .equalTo('id', tagId)
      .deleteOne();

    if (result) {
      return res.json(tagSerializer(result.toJSON()));
    } else {
      res.json(new Error(`未找到tag=${tagId}对应的记录`));
    }
  });

  return router;
}
