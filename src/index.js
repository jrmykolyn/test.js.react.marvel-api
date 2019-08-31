import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App apiKey={ process.env.REACT_APP_MARVEL_API_KEY } />, document.getElementById('root'));
