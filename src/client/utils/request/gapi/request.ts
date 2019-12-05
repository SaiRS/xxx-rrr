import { XXXResponse, XXXRequestConfig } from '@cvendors/requests';

const googleCalenderUrl = 'https://www.googleapis.com/calendar/v3/calendars';

/**
 * 获取google calendar的请求的绝对地址
 * @param {string} path 请求的相对地址
 * @returns {string} google calendar请求的绝对地址
 */
function getGoogleCalendarRequestUrl(path: string) {
  let pathCopy = path;
  if (pathCopy.startsWith('/')) {
    pathCopy = pathCopy.substring(1);
  }

  return `${googleCalenderUrl}/${pathCopy}`;
}

function toXXXResponseFormat<T = any>(data: T): XXXResponse<T> {
  return {
    data,
    status: 200,
    statusText: 'ok',
    headers: {},
    config: {},
  };
}

export const googleCalendarRequest = {
  get: async function get<T = any, R = XXXResponse<T>>(
    path: string,
    config?: XXXRequestConfig,
  ) {
    // let result: gapi.client.HttpRequest<T> = await gapi.client.request({
    //   path: getGoogleCalendarRequestUrl(path),
    //   method: 'get',
    //   params: config && config.params,
    //   headers: config && config.headers,
    //   body: config && config.data,
    // });
    // // 转换成XXXResponse<T>
    // return toXXXResponseFormat(result);
  },
};
