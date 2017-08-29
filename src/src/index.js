import React from 'react';
import {render} from 'react-snapshot';
import './index.css';
import "uswds/dist/css/uswds.css";
import "uswds";
import App from './App';
import registerServiceWorker from './registerServiceWorker';

render(
    <App />,
    document.getElementById('root')
);
registerServiceWorker();
