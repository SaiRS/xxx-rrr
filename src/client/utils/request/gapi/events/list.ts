import { ICalendarEvent } from './types';
import { IReminder } from '../calendar-list/types';

interface ICalendarEventsPayload {
  calendarId: string;
  alwaysIncludeEmail?: boolean;
  iCalUID?: string;
  maxAttendees?: number;
  maxResults?: number;
  orderBy?: string;
  pageToken?: string;
  privateExtendedProperty?: string;
  q?: string;
  sharedExtendedProperty?: string;
  showDeleted?: boolean;
  showHiddenInvitations?: boolean;
  singleEvents?: boolean;
  syncToken?: string;
  timeMax?: string;
  timeMin?: string;
  timeZone?: string;
  updatedMin?: string;
}

interface ICalenderEventListResponse {
  kind: 'calendar#events';
  etag: string;
  summary: string;
  description: string;
  updated: string;
  timeZone: string;
  accessRole: string;
  defaultReminders: IReminder[];
  nextPageToken: string;
  nextSyncToken: string;
  items: ICalendarEvent[];
}

/**
 * 获取event列表信息
 * @description 更多信息https://developers.google.com/calendar/v3/reference/events/list
 * @export
 * @param {ICalendarEventsPayload} payload
 * @returns {Promise<ICalendarEvent[]>}
 */
export async function getCalendarEvents(
  payload: ICalendarEventsPayload,
): Promise<ICalenderEventListResponse> {
  // @ts-ignore
  return gapi.client.calendar.events
    .list(payload)
    .then(
      (
        response: gapi.client.HttpRequestFulfilled<ICalenderEventListResponse>,
      ) => {
        return response.result;
      },
    )
    .catch((error: gapi.client.HttpRequestRejected) => {
      return error;
    });
}
