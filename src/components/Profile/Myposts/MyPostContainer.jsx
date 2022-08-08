import {upadatePostTextActionCreator, addPostActionCreator} from '../../../redux/profile-reducer';
import Mypost from './Mypost';

const MyPostContainer = (props) => {
  let state = props.store.getState();
  const handleMessageChange = (text) => {
    props.store.dispatch(upadatePostTextActionCreator(text));
  };
  const addPost = () => {
    props.store.dispatch(addPostActionCreator());
  };
  return (<Mypost updateNewPostText={handleMessageChange} 
    addPost={addPost} postData={state.profilePage.postData} 
    newPostText={state.profilePage.newPostText}/>);
} 

export default MyPostContainer;