import HeaderContainer from './components/Header/HeaderContainer';
import SidebarContainer from './components/Sidebar/SidebarContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import Login from './components/auth/login';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Component } from 'react';
import { connect } from "react-redux";
import { setInitializedThunkCreator} from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';

class App extends Component {
  componentDidMount(){
    this.props.setInitializedThunkCreator();
  }
  render(){
    if(!this.props.initialized) {
      return <Preloader />
    }
    return (
      <BrowserRouter>
        <div className="app-wrapper">
          <HeaderContainer />
          <SidebarContainer />
          <div className='app-wrapper__content'>
            <Routes>
              <Route path='/profile/:userId' element={<ProfileContainer />}/>
              <Route path='/profile' element={<ProfileContainer />}/>
              <Route path='/dialogs/*' element={<DialogsContainer />}/>
              <Route path='/news' element={<News />}/>
              <Route path='/music' element={<Music />}/>
              <Route path='/users' element={<UsersContainer />}/>
              <Route path='/settings' element={<Settings />}/>
              <Route path='/login' element={<Login />}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

export default connect(mapStateToProps, {setInitializedThunkCreator})(App);
