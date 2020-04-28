import * as React from 'react';
import { gapiLoad, gapiSignIn, gapiSignOut } from '@cutils/request/gapi';
import { CLogger } from '@cutils';
import { getCalendarColors } from '@cutils/request/gapi/colors';
import { getCalendarList } from '@cutils/request/gapi/calendar-list';
import { getCalendarEvents } from '@cutils/request/gapi/events';

function listUpcomingEvents() {
  // @ts-ignore
  gapi.client.calendar.calendarList
    .list({
      minAccessRole: 'owner',
      prettyPrint: true,
    })
    .then((response: any) => {
      CLogger.info(response);
    });

  // @ts-ignore
  // gapi.client.calendar.events
  //   .list({
  //     calendarId: 'primary',
  //     timeMin: new Date().toISOString(),
  //     showDeleted: false,
  //     singleEvents: true,
  //     maxResults: 10,
  //     orderBy: 'startTime',
  //   })
  //   // @ts-ignore
  //   .then(function(response) {
  //     var events = response.result.items;
  //     CLogger.info(events);
  //   });
}

export default function AnalysisEntry(): React.ReactElement {
  const [isLogIn, setIsLogIn] = React.useState(false);

  React.useEffect(() => {
    gapiLoad((isLoggedIn: boolean) => {
      CLogger.info('000000000000000', isLoggedIn);
      setIsLogIn(isLoggedIn);
      if (isLoggedIn) {
        // listUpcomingEvents();
        getCalendarList();
        getCalendarEvents({
          calendarId: 'ntptsf0pflmaf48f41oq4se2q8@group.calendar.google.com',
        });
      }
    });
  }, []);

  function onSignIn() {
    gapiSignIn();
  }

  function onSignOut() {
    gapiSignOut();
  }

  return (
    <div>
      {isLogIn ? (
        <div onClick={onSignOut}>登出</div>
      ) : (
        <div onClick={onSignIn}>授权</div>
      )}
    </div>
  );
}
