import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = (props) => {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Sidebar {...props.sidebar}/>
        <div className='app-wrapper__content'>
          <Routes>
            <Route path='/profile' element={<Profile {...props.profilePage} addPost={props.addPost} upadtePostText={props.upadtePostText}/>}/>
            <Route path='/dialogs/*' element={<Dialogs {...props.dialogsPage}/>}/>
            <Route path='/news' element={<News />}/>
            <Route path='/music' element={<Music />}/>
            <Route path='/settings' element={<Settings />}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
} 

export default App;
