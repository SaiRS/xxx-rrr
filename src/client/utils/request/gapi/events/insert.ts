import { ICalendarEvent, ICalendarEventTime } from './types';

interface IInsertCalendarEventPayload {
  calendarId: string;
  conferenceDataVersion?: number;
  maxAttendees?: number;
  sendNotifications?: boolean;
  sendUpdates?: string;
  supportsAttachments?: boolean;
}

/**
 * 新增一个事件
 * @description 更多信息：https://developers.google.com/calendar/v3/reference/events/insert?apix=true
 * @export
 * @param {IInsertCalendarEventPayload} params 额外的设定
 * @param {Partial<ICalendarEvent>} resource 事件的信息
 * @returns {Promise<ICalendarEvent>}
 */
export function insertCalendarEvent(
  params: IInsertCalendarEventPayload,
  resource: Partial<Omit<ICalendarEvent, 'end' | 'start'>> & {
    end: ICalendarEventTime;
    start: ICalendarEventTime;
  },
): Promise<ICalendarEvent> {
  // @ts-ignore
  return gapi.client.calendar.events
    .insert({
      ...params,
      resource: resource,
    })
    .then((response: gapi.client.HttpRequestFulfilled<ICalendarEvent>) => {
      return response.result;
    })
    .catch((error: gapi.client.HttpRequestRejected) => {
      return error;
    });
}
