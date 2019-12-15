import React from 'react';
import LogRocket from 'logrocket';
import AV from 'leancloud-storage';
import ModuleStyles from './App.module.scss';
import classNames from 'classnames';
import { CLogger } from '@cutils';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';

import { DiGoogleAnalytics } from 'react-icons/di';
import { GoTasklist } from 'react-icons/go';
import { MdTimer } from 'react-icons/md';
import { IoMdSettings } from 'react-icons/io';

import '@client/assets/styles/index.scss';
// import { Button, Container, Row, Col } from 'react-bootstrap';
import { AnalysisEntry } from './pages/analysis';
import { PlanEntry } from './pages/plan';
import { TimerEntry } from './pages/timer';
import SettingEntry from './pages/setting/setting-entry';

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
    // TODO: 初始化logrocket
    // LogRocket.init('fj281r/xxx-rrr');
  });

  // React.useEffect(() => {
  //   // 初始化google api
  //   // 1. 加载
  //   gapi.load('client:auth2', async () => {
  //     var DISCOVERY_DOCS = [
  //       'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  //     ];

  //     // Authorization scopes required by the API; multiple scopes can be
  //     // included, separated by spaces.
  //     const SCOPES = 'https://www.googleapis.com/auth/calendar';

  //     try {
  //       // 2. 初始化
  //       await gapi.client.init({
  //         apiKey: process.env.REACT_APP_GOOGLE_API_KEY || '',
  //         clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
  //         // discoveryDocs: ['https://discovery.googleapis.com/$discovery/rest'],
  //         discoveryDocs: DISCOVERY_DOCS,
  //         scope: SCOPES,
  //       });

  //       // Listen for sign-in state changes.
  //       // @ts-ignore
  //       gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

  //       // Handle the initial sign-in state.
  //       // @ts-ignore
  //       updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  //     } catch (error) {
  //       CLogger.error(error);
  //     }
  //   });
  // });

  // /**
  //  *  Called when the signed in status changes, to update the UI
  //  *  appropriately. After a sign-in, the API is called.
  //  */
  // function updateSigninStatus(isSignedIn: boolean) {
  //   if (isSignedIn) {
  //     authRef.current!.style.display = 'none';
  //     signOutRef.current!.style.display = 'block';
  //     listUpcomingEvents();
  //   } else {
  //     authRef.current!.style.display = 'block';
  //     signOutRef.current!.style.display = 'none';
  //   }
  // }

  // /**
  //  *  Sign in the user upon button click.
  //  */
  // function handleAuthClick(event: React.MouseEvent) {
  //   // @ts-ignore
  //   gapi.auth2.getAuthInstance().signIn();
  // }

  // /**
  //  *  Sign out the user upon button click.
  //  */
  // function handleSignoutClick(event: React.MouseEvent) {
  //   // @ts-ignore
  //   gapi.auth2.getAuthInstance().signOut();
  // }

  // /**
  //  * Append a pre element to the body containing the given message
  //  * as its text node. Used to display the results of the API call.
  //  *
  //  * @param {string} message Text to be placed in pre element.
  //  */
  // function appendPre(message: string) {
  //   var textContent = document.createTextNode(message + '\n');
  //   preRef.current!.appendChild(textContent);
  // }

  // /**
  //  * Print the summary and start datetime/date of the next ten events in
  //  * the authorized user's calendar. If no events are found an
  //  * appropriate message is printed.
  //  */
  // function listUpcomingEvents() {
  //   // @ts-ignore
  //   gapi.client.calendar.events
  //     .list({
  //       calendarId: 'primary',
  //       timeMin: new Date().toISOString(),
  //       showDeleted: false,
  //       singleEvents: true,
  //       maxResults: 10,
  //       orderBy: 'startTime',
  //     })
  //     // @ts-ignore
  //     .then(function(response) {
  //       var events = response.result.items;
  //       appendPre('Upcoming events:');

  //       if (events.length > 0) {
  //         for (let i = 0; i < events.length; i++) {
  //           var event = events[i];
  //           var when = event.start.dateTime;
  //           if (!when) {
  //             when = event.start.date;
  //           }
  //           appendPre(event.summary + ' (' + when + ')');
  //         }
  //       } else {
  //         appendPre('No upcoming events found.');
  //       }
  //     });
  // }

  return (
    <div className="flex w-full h-full bg-gray-100">
      <BrowserRouter>
        {/* sider */}
        <div className="flex-col left-0 top-0 bottom-0 w-1/6 max-w-xs border-r bg-white hidden sm:flex ">
          <div className="flex-grow-0 flex-shrink-0 h-12 border-b">Header</div>
          <div className="flex-auto overflow-y-scroll h-full">
            <Link
              to="/analysis"
              className={classNames(
                'flex flex items-center p-2 hover:text-blue-600',
              )}
            >
              <DiGoogleAnalytics className="w-6 h-6"></DiGoogleAnalytics>
              <span>分析</span>
            </Link>
            <Link to="/plan" className="flex flex items-center p-2">
              <GoTasklist className="w-6 h-6 hover:text-blue-600"></GoTasklist>
              <span>计划</span>
            </Link>
            <Link to="/timer" className="flex flex items-center p-2">
              <MdTimer className="w-6 h-6 hover:text-blue-600"></MdTimer>
              <span>番茄钟</span>
            </Link>
            <Link to="/setting" className="flex flex items-center p-2">
              <IoMdSettings className="w-6 h-6 hover:text-blue-600"></IoMdSettings>
              <span>设置</span>
            </Link>
          </div>
          <div className="flex-grow-0 flex-shrink-0 h-12 border-t">Footer</div>
        </div>

        <Switch>
          <Route path="/analysis" component={AnalysisEntry}></Route>
          <Route path="/plan" component={PlanEntry}></Route>
          <Route path="/timer" component={TimerEntry}></Route>
          <Route path="/setting" component={SettingEntry}></Route>
          <Redirect to="/analysis"></Redirect>
        </Switch>

        {/* footer */}
        <div className="flex fixed bottom-0 w-full p-3 border-solid border-t sm:hidden">
          <div className="flex flex-1 flex-col items-center justify-center">
            <DiGoogleAnalytics className="w-6 h-6 hover:text-blue-600"></DiGoogleAnalytics>
            <span>分析</span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center">
            <GoTasklist className="w-6 h-6 hover:text-blue-600"></GoTasklist>
            <span>计划</span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center">
            <MdTimer className="w-6 h-6 hover:text-blue-600"></MdTimer>
            <span>番茄钟</span>
          </div>
        </div>
      </BrowserRouter>
    </div>

    // <div className="App">
    //   <Container>
    //     <Row>
    //       <Col md={4}>md=4</Col>
    //       <Col md={{ span: 4, offset: 4 }}>{`md={{ span: 4, offset: 4 }}`}</Col>
    //     </Row>
    //     <Row>
    //       <Col md={{ span: 3, offset: 3 }}>{`md={{ span: 3, offset: 3 }}`}</Col>
    //       <Col md={{ span: 3, offset: 3 }}>{`md={{ span: 3, offset: 3 }}`}</Col>
    //     </Row>
    //     <Row>
    //       <Col md={{ span: 6, offset: 3 }}>{`md={{ span: 6, offset: 3 }}`}</Col>
    //     </Row>
    //   </Container>
    //   <button
    //     style={{ display: 'none' }}
    //     ref={authRef}
    //     onClick={handleAuthClick}
    //   >
    //     Authorize
    //   </button>
    //   <button
    //     style={{ display: 'none' }}
    //     ref={signOutRef}
    //     onClick={handleSignoutClick}
    //   >
    //     Sign Out
    //   </button>
    //   <Button>BootStrap</Button>
    //   <pre ref={preRef} style={{ whiteSpace: 'pre-wrap' }}></pre>
    // </div>
  );
};

export default App;
