import { IRDocument } from '../interface-define';

import * as admin from 'firebase-admin';

// TODO: FirebaseDocument
// @ts-ignore
export class FirebaseDocument implements IRDocument {
  doc: admin.database.Reference;
  constructor(doc: admin.database.Reference, attributes?: Record<string, any>) {
    this.doc = doc;
  }

  get id(): string {
    return this.doc.key || '';
  }

  equals(doc: IRDocument): boolean {
    return !!this.id && this.id === doc.id;
  }

  get(key: string): any {
    return this.doc;
  }
}
