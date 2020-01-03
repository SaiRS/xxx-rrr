import { ComposedQuery } from './query';
import { IRModel, IRQuery, IRDocument } from '../interface-define';
import { ComposedDocument } from './document';

export class ComposedModel implements IRModel {
  models: IRModel[];
  constructor(...models: IRModel[]) {
    this.models = models;
  }

  createDocument(attributes?: Record<string, any>): IRDocument {
    let allDocuments = [];
    for (let i = 0; i < this.models.length; i++) {
      allDocuments.push(this.models[i].createDocument(attributes));
    }

    return new ComposedDocument(allDocuments);
  }

  createQuery(): IRQuery {
    let allQueries: IRQuery[] = [];
    for (let i = 0; i < this.models.length; i++) {
      allQueries.push(this.models[i].createQuery());
    }

    return new ComposedQuery(allQueries);
  }

  find(criteria?: any): Promise<IRDocument[]> {
    return this.models[0].find(criteria);
  }
  findById(id: string): Promise<null | IRDocument> {
    return this.models[0].findById(id);
  }
  findOne(conditions?: any): Promise<null | IRDocument> {
    return this.models[0].findOne(conditions);
  }
}
