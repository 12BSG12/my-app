import './App.css';

const App = () => {
  return (
    <div className="app-wrapper">
      <header className="header">
        <img src="https://via.placeholder.com/50"/>
      </header>
      <nav className="sidebar">
        <ul className="menu">
          <li className="menu__item">Profile</li>
          <li className="menu__item">Messages</li>
          <li className="menu__item">News</li>
          <li className="menu__item">Music</li>
          <li className="menu__item">Settings</li>
        </ul>
      </nav>
      <content className="content">
        <div className="content__top-img">
          <img src="https://via.placeholder.com/1200x500"/>
        </div>
        <div className="content__user">
          <div className="content__user-avatar"></div>
          <div className="content__user-body">
            <div className="content__user-name"></div>
            <div className="content__user-birth"></div>
            <div className="content__user-city"></div>
            <div className="content__user-education"></div>
            <div className="content__user-Web"></div>
          </div>
        </div>
        <form className="content__posts">
          <label className="content__posts-title">My posts</label>
          <article className="content__posts-article" placeholder="your news..."></article>
          <button type="Send">Send</button>
        </form>
        <div className="content__comment">
          <div className="content__comment-item">
            <img className="content__comment-avatar" src="https://via.placeholder.com/150"/>
            <div className="content__comment-text">Hey, why nobody love me?</div>
          </div>
          <div className="content__comment-item">
            <img className="content__comment-avatar" src="https://via.placeholder.com/150"/>
            <div className="content__comment-text">It`s our new program! Hey!</div>
          </div>
        </div>
      </content>
    </div>
  );
} 

export default App;
