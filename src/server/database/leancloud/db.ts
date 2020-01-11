import AV from 'leancloud-storage';
import { IRDatabase } from '../interface-define';
import { getLeanCloudModel } from './model';

export function getLeanCloundDB(): IRDatabase {
  return {
    init: function init() {
      // 初始化leancloud
      AV.init({
        appId: process.env.REACT_APP_LEAN_CLOUD_APP_ID || '',
        appKey: process.env.REACT_APP_LEAN_CLOUD_APP_KEY || '',
        serverURLs: process.env.REACT_APP_LEAN_CLOUD_APP_REST_API || '',
      });
    },
    destory() {
      // do nothing
    },

    /**
     * 创建数据表
     * @param {string} name
     */
    getModel(
      name: string,
      protoProps: Object = {},
      classProps: Object = {},
      schemaProps = {},
    ) {
      let model = getLeanCloudModel(name, protoProps, classProps);
      return model;
    },
  };
}
