import { Request } from 'express';
import * as core from 'express-serve-static-core';

declare module 'express' {
  interface Request<P extends core.Params = core.ParamsDictionary>
    extends core.Request<P> {
    // id: string;
  }
}
