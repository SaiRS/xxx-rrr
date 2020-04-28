export interface IReminder {
  method: string;
  minues: number;
}

export interface INotification {
  type: string;
  method: string;
}

export interface ICalendarListEntry {
  kind: 'calendar#calendarListEntry';
  etag: string;
  id: string;
  summary: string;
  description: string;
  location: string;
  timeZone: string;
  summarOverride: string;
  colorId: string;
  backgroundColor: string;
  foregroundColor: string;
  hidden: boolean;
  selected: boolean;
  accessRole: string;
  defaultReminders: IReminder[];
  notificationSettings: {
    notifications: INotification[];
  };
  primary: boolean;
  deleted: boolean;
  conferenceProperties: {
    allowedConferenceSolutionTypes: string[];
  };
}
