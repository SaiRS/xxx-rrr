import { ICalendarListEntry } from './types/index';
interface ICalendarListPayload {
  maxResults: number; // 默认100, 最大250
  minAccessRole: string;
  pageToken: string;
  showDeleted: boolean;
  showHidden: boolean;
  syncToken: string;
}

export interface ICalendarListResponse {
  kind: 'calendar#calendarList';
  etag: string;
  nextPageToken: string;
  nextSyncToken: string;
  items: ICalendarListEntry[];
}

/**
 * 获取calendar list列表
 * @description
 * 更多信息： https://developers.google.com/calendar/v3/reference/calendarList/list?apix=true
 * @export
 */
export async function getCalendarList(
  payload: Partial<ICalendarListPayload> = {},
): Promise<ICalendarListResponse> {
  // @ts-ignore
  return gapi.client.calendar.calendarList
    .list(payload)
    .then(
      (response: gapi.client.HttpRequestFulfilled<ICalendarListResponse>) => {
        return response.result;
      },
    )
    .catch((reason: gapi.client.HttpRequestRejected) => {
      return reason;
    });
}
