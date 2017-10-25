import React from 'react';
import ReactDOM from 'react-dom';
import 'uswds/dist/css/uswds.css';
import 'uswds';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import registerAppCache from './registerAppCache';

ReactDOM.render(<App />, document.getElementById('root'));
//render(<App />, document.getElementById('root'));

registerServiceWorker();
registerAppCache();
