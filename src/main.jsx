import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Redux
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
// import './index.css'
import App from './App.jsx'
import allReducers from './reducers/index.js'

// Create Store
const store = configureStore({
  reducer: allReducers
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
        <App />
    </Provider>
  </StrictMode>
)
