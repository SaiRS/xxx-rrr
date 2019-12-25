interface IDeleteCalendaerEventPayload {
  calendarId: string;
  eventId: string;
  sendUpdates?: string;
}

/**
 * 删除一个event
 * @description 更多信息：https://developers.google.com/calendar/v3/reference/events/delete
 * @param {IDeleteCalendaerEventPayload} payload 请求参数
 * @returns {Promise<void>} void
 */
export async function deleteCalenderEvent(
  payload: IDeleteCalendaerEventPayload,
): Promise<void> {
  // @ts-ignore
  return gapi.client.calendar.events
    .delete(payload)
    .then((response: gapi.client.HttpRequestFulfilled<void>) => {
      return response.result;
    })
    .catch((error: gapi.client.HttpRequestRejected) => {
      return error;
    });
}
