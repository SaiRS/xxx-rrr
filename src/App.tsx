import React from 'react';
import LogRocket from 'logrocket';
import logo from './logo.svg';
import './App.css';

// 初始化leancloud
import AV from 'leancloud-storage';
AV.init({
  appId: process.env.REACT_APP_LEAN_CLOUD_APP_ID || '',
  appKey: process.env.REACT_APP_LEAN_CLOUD_APP_KEY || '',
  serverURLs: process.env.REACT_APP_LEAN_CLOUD_APP_REST_API || '',
});

// 初始化logrocket
LogRocket.init('fj281r/xxx-rrr');

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
