const Content = () => {
  return (
    <main className="content">
      <div className="content__top-img">
        <img src="https://via.placeholder.com/1200x500"/>
      </div>
      <div className="content__user">
        <div className="content__user-avatar">
          <img src="https://via.placeholder.com/150"/>
        </div>
        <div className="content__user-body">
          <div className="content__user-name">Vadim G.</div>
          <div className="content__user-birth">Date of birth: 28 march</div>
          <div className="content__user-city">City: Osa</div>
          <div className="content__user-education">Education: -</div>
          <div className="content__user-Web">Web Site: <a href='#'>https://4eta-tam.com</a></div>
        </div>
      </div>
      <form className="content__posts">
        <label className="content__posts-title">My posts</label>
        <article className="content__posts-article" placeholder="your news..."></article>
        <button className="content__posts-btn" type="Send">Send</button>
      </form>
      <div className="content__comment">
        <div className="content__comment-item">
          <img className="content__comment-avatar" src="https://via.placeholder.com/50"/>
          <div className="content__comment-text">Hey, why nobody love me?</div>
        </div>
        <div className="content__comment-item">
          <img className="content__comment-avatar" src="https://via.placeholder.com/50"/>
          <div className="content__comment-text">It`s our new program! Hey!</div>
        </div>
      </div>
    </main>
  );
} 

export default Content;