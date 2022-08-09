import {upadatePostTextActionCreator, addPostActionCreator} from '../../../redux/profile-reducer';
import Mypost from './Mypost';
import { useDispatch, useSelector } from 'react-redux'

const MyPostContainer = (props) => {
  const dispatch = useDispatch();
  const postData = useSelector(state => state.profilePage.postData);  
  const newPostText = useSelector(state => state.profilePage.newPostText);  
  const handleMessageChange = (text) => {
    dispatch(upadatePostTextActionCreator(text));
  };
  const addPost = () => {
    dispatch(addPostActionCreator());
  };
  return (<Mypost updateNewPostText={handleMessageChange} 
    addPost={addPost} postData={postData} 
    newPostText={newPostText}/>);
} 

export default MyPostContainer;