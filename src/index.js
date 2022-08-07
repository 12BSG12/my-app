import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/state';

const root = ReactDOM.createRoot(document.getElementById('root'));
let renderEntirTree = () => {
  root.render(
    <React.StrictMode>
      <App {...store.getState()} addPost={store.addPost.bind(store)} upadtePostText={store.upadtePostText.bind(store)}/>
    </React.StrictMode>
  );
}
renderEntirTree();
store.subscribe(renderEntirTree);
reportWebVitals();
