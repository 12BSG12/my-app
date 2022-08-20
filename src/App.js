import HeaderContainer from './components/Header/HeaderContainer';
import SidebarContainer from './components/Sidebar/SidebarContainer';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Component } from 'react';
import { connect } from "react-redux";
import { setInitializedThunkCreator} from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import {Suspense, lazy} from 'react';

const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'));
const News = lazy(() => import('./components/News/News'));
const Music = lazy(() => import('./components/Music/Music'));
const Settings = lazy(() => import('./components/Settings/Settings'));
const UsersContainer = lazy(() => import('./components/Users/UsersContainer'));
const Login = lazy(() => import('./components/auth/login'));

class App extends Component {
  componentDidMount(){
    this.props.setInitializedThunkCreator();
  }
  render(){
    if(!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <SidebarContainer />
        <Suspense fallback={<Preloader />}>
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
        </Suspense>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

export default connect(mapStateToProps, {setInitializedThunkCreator})(App);
