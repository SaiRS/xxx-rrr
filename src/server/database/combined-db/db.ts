import { IRDatabase, IRModel } from '../interface-define';
import { getLeanCloundDB } from '../leancloud/db';
import { getMongoDB } from '../local-mongodb/db';
import { ComposedModel } from './model';

class ComposedDB implements IRDatabase {
  dbs: IRDatabase[];

  constructor(...dbs: IRDatabase[]) {
    this.dbs = [...dbs];
  }

  init() {
    for (let i = 0; i < this.dbs.length; i++) {
      this.dbs[i].init();
    }
  }

  destory() {
    for (let i = 0; i < this.dbs.length; i++) {
      this.dbs[i].destory();
    }
  }

  getModel(name: string, protoProps: Object, classProps: Object): IRModel {
    let models = this.dbs.map((db) => {
      return db.getModel(name, protoProps, classProps);
    });

    // @ts-ignore
    return new ComposedModel(...models);
  }
}

export function getComposedDBInstance() {
  return new ComposedDB(getLeanCloundDB(), getMongoDB());
}
