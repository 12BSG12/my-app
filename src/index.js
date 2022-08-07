import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {state, addPost, upadtePostText, subscribe} from './redux/state';

const root = ReactDOM.createRoot(document.getElementById('root'));
let renderEntirTree = () => {
  root.render(
    <React.StrictMode>
      <App {...state} addPost={addPost} upadtePostText={upadtePostText}/>
    </React.StrictMode>
  );
}
renderEntirTree();
subscribe(renderEntirTree);
reportWebVitals();
