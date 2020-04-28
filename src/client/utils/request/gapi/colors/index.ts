export interface ICalendarColor {
  background: string;
  foreground: string;
}

export interface ICalendarColorResponse {
  kind: 'calendar#colors';
  updated: string;
  calendar: {
    [key: string]: ICalendarColor;
  };
  event: {
    [key: string]: ICalendarColor;
  };
}

/**
 * 获取goolge calendar中的颜色配置信息
 * @description
 * 更多信息可以参考 https://developers.google.com/calendar/v3/reference/colors/get?apix=true
 * @export
 * @returns 颜色配置信息
 */
export async function getCalendarColors(): Promise<ICalendarColorResponse> {
  // @ts-ignore
  return gapi.client.calendar.colors
    .get({})
    .then(
      (response: gapi.client.HttpRequestFulfilled<ICalendarColorResponse>) => {
        return response.result;
      },
    )
    .catch((reason: gapi.client.HttpRequestRejected) => {
      return reason;
    });
}
