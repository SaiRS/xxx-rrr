import { CLogger } from '@cutils/debug';

interface IUpdateSignStatusFunc {
  (isSignIn: boolean): void;
}

/**
 * 加载google api
 * 这是在使用google api的第一步
 * @export
 */
export function gapiLoad(callback: IUpdateSignStatusFunc) {
  gapi.load('client:auth2', () => {
    gapiInit(callback);
  });
}

/**
 * 初始化google api
 * @param {IUpdateSignStatusFunc} callback google api status状态变化的回调
 */
async function gapiInit(callback: IUpdateSignStatusFunc) {
  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  // 最终会使用join(' ')合并起来
  // 可通过https://developers.google.com/oauthplayground/查看对应的scope
  const SCOPES = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events',
    // 'https://www.googleapis.com/auth/calendar.events.readonly',
  ];

  const DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  ];

  try {
    // 初始化
    await gapi.client.init({
      apiKey: process.env.REACT_APP_GOOGLE_API_KEY || '',
      clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
      // discoveryDocs: ['https://discovery.googleapis.com/$discovery/rest'],
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES.join(' '),
    });

    // Listen for sign-in state changes.
    // @ts-ignore
    gapi.auth2.getAuthInstance().isSignedIn.listen(callback);

    // 在状态变化之前，先调用一次
    // @ts-ignore
    callback(gapi.auth2.getAuthInstance().isSignedIn.get());
  } catch (error) {
    CLogger.error(error);
  }
}
