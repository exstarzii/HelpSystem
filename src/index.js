import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, Routes, BrowserRouter } from "react-router-dom"
import MakeRequestComp from './components/MakeRequestComp/MakeRequestComp';
import RequestsComp from './components/RequestsComp/RequestsComp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes >
        <Route exact path='/' element={<MakeRequestComp/>}/>
        <Route path='/makerequest' element={<MakeRequestComp/>}/>
        <Route path='/requests' element={<RequestsComp/>}/>
      </Routes >
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
