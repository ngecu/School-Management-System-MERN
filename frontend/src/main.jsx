// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './bootstrap.min.css'
import './index.css'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import store from './store'


import './plugins/jquery/jquery.min.js';
import './plugins/jquery-ui/jquery-ui.min.js';
import './plugins/bootstrap/js/bootstrap.bundle.min.js';
import './plugins/chart.js/Chart.min.js';
// import './plugins/jquery-sparkline/jquery.sparkline.js';
// import './plugins/jqvmap/dist/jquery.vmap.min.js';
// import './plugins/jqvmap/dist/maps/jquery.vmap.usa.js';
import './plugins/jquery-knob/jquery.knob.min.js';
// import './plugins/moment/moment.min.js';
// import './plugins/daterangepicker/daterangepicker.js';
// import './plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js';
import './plugins/summernote/summernote-bs4.min.js';
import './plugins/overlayscrollbars/js/jquery.overlayScrollbars.min.js';

// Import CSS files for the plugins you're using
import './plugins/jquery-ui/jquery-ui.min.css';
// import './plugins/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)

serviceWorker.unregister()