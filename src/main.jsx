import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)


    // display: flex; /* Make cards behave like horizontal rows */
    // overflow-x: scroll; /* Enable horizontal scrolling */
    // width: 95%; /* Set the width of the scrollable area */
    // scroll-snap-type: x mandatory; 