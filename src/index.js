import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

let dialogsData = [
  {id:1, name:'Vadim'},
  {id:2, name:'Andrew'},
];

let messagesData = [
  {id:1, message:'shhhsgh'},
  {id:2, message:'121'},
];

let postData = [
  {id: 1, message:'Hey, why nobdy love me?', likesCount: 12},
  {id: 2, message:'It`s our new program! Hey!', likesCount: 24},
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App dialogs={dialogsData} messages={messagesData} post={postData}/>
  </React.StrictMode>
);

reportWebVitals();
