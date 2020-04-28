import { ICalendarEvent, ICalendarEventTime } from './types';

interface IUpdateCalendarEventPayload {
  calendarId: string;
  eventId: string;

  conferenceDataVersion?: number;
  alwaysIncludeEmail?: boolean;
  maxAttendees?: number;
  sendUpdates?: string;
}

/**
 * 更新event
 * @export
 * @param {IUpdateCalendarEventPayload} params
 * @param {Partial<ICalendarEvent>} resource
 * @returns
 */
export async function updateCalendarEvent(
  params: IUpdateCalendarEventPayload,
  resource: Partial<Omit<ICalendarEvent, 'end' | 'start'>> & {
    end: ICalendarEventTime;
    start: ICalendarEventTime;
  },
) {
  // @ts-ignore
  return gapi.client.calendar.events
    .update({
      ...params,
      resource: resource,
    })
    .then((response: gapi.client.HttpRequestFulfilled<any>) => {
      return response.result;
    })
    .catch((error: gapi.client.HttpRequestRejected) => {
      return error;
    });
}
