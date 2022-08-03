import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Profile from './components/Profile/Profile';
import './App.css';

const App = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <Sidebar />
      <Profile />
    </div>
  );
} 

export default App;
