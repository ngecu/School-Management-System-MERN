// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './bootstrap.min.css'
import './index.css'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)

serviceWorker.unregister()