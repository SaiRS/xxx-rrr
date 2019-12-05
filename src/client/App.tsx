import React from 'react';
import LogRocket from 'logrocket';
import AV from 'leancloud-storage';
import logo from './logo.svg';
import './App.css';
import { CLogger } from '@cutils';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  const signOutRef = React.useRef<HTMLButtonElement>(null);
  const authRef = React.useRef<HTMLButtonElement>(null);
  const preRef = React.useRef<HTMLPreElement>(null);

  React.useEffect(() => {
    // 初始化leancloud
    AV.init({
      appId: process.env.REACT_APP_LEAN_CLOUD_APP_ID || '',
      appKey: process.env.REACT_APP_LEAN_CLOUD_APP_KEY || '',
      serverURLs: process.env.REACT_APP_LEAN_CLOUD_APP_REST_API || '',
    });
  });

  React.useEffect(() => {
    // 初始化logrocket
    LogRocket.init('fj281r/xxx-rrr');
  });

  React.useEffect(() => {
    // 初始化google api
    // 1. 加载
    gapi.load('client:auth2', async () => {
      var DISCOVERY_DOCS = [
        'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
      ];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      const SCOPES = 'https://www.googleapis.com/auth/calendar';

      try {
        // 2. 初始化
        await gapi.client.init({
          apiKey: process.env.REACT_APP_GOOGLE_API_KEY || '',
          clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
          // discoveryDocs: ['https://discovery.googleapis.com/$discovery/rest'],
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        });

        // Listen for sign-in state changes.
        // @ts-ignore
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        // @ts-ignore
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      } catch (error) {
        CLogger.error(error);
      }
    });
  });

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  function updateSigninStatus(isSignedIn: boolean) {
    if (isSignedIn) {
      authRef.current!.style.display = 'none';
      signOutRef.current!.style.display = 'block';
      listUpcomingEvents();
    } else {
      authRef.current!.style.display = 'block';
      signOutRef.current!.style.display = 'none';
    }
  }

  /**
   *  Sign in the user upon button click.
   */
  function handleAuthClick(event: React.MouseEvent) {
    // @ts-ignore
    gapi.auth2.getAuthInstance().signIn();
  }

  /**
   *  Sign out the user upon button click.
   */
  function handleSignoutClick(event: React.MouseEvent) {
    // @ts-ignore
    gapi.auth2.getAuthInstance().signOut();
  }

  /**
   * Append a pre element to the body containing the given message
   * as its text node. Used to display the results of the API call.
   *
   * @param {string} message Text to be placed in pre element.
   */
  function appendPre(message: string) {
    var textContent = document.createTextNode(message + '\n');
    preRef.current!.appendChild(textContent);
  }

  /**
   * Print the summary and start datetime/date of the next ten events in
   * the authorized user's calendar. If no events are found an
   * appropriate message is printed.
   */
  function listUpcomingEvents() {
    // @ts-ignore
    gapi.client.calendar.events
      .list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime',
      })
      // @ts-ignore
      .then(function(response) {
        var events = response.result.items;
        appendPre('Upcoming events:');

        if (events.length > 0) {
          for (let i = 0; i < events.length; i++) {
            var event = events[i];
            var when = event.start.dateTime;
            if (!when) {
              when = event.start.date;
            }
            appendPre(event.summary + ' (' + when + ')');
          }
        } else {
          appendPre('No upcoming events found.');
        }
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <button
          style={{ display: 'none' }}
          ref={authRef}
          onClick={handleAuthClick}
        >
          Authorize
        </button>
        <button
          style={{ display: 'none' }}
          ref={signOutRef}
          onClick={handleSignoutClick}
        >
          Sign Out
        </button>
      </header>
      <Button>BootStrap</Button>
      <pre ref={preRef} style={{ whiteSpace: 'pre-wrap' }}></pre>
    </div>
  );
};

export default App;
