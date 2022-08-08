import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/redux-store';

const root = ReactDOM.createRoot(document.getElementById('root'));
let renderEntirTree = () => {
  root.render(
    <React.StrictMode>
      <App store={store}/>
    </React.StrictMode>
  );
}
renderEntirTree();
store.subscribe(renderEntirTree());
reportWebVitals();
