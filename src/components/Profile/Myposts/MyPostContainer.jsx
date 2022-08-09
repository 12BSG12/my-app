import {upadatePostTextActionCreator, addPostActionCreator} from '../../../redux/profile-reducer';
import Mypost from './Mypost';
import { useDispatch, useSelector , connect} from 'react-redux'


const mapStateToProps = (state) =>({
  postData: state.profilePage.postData,
  newPostText: state.profilePage.newPostText
});

const mapDispatchToProps = (dispatch) =>({
  updateNewPostText: (text) => {dispatch(upadatePostTextActionCreator(text));},
  addPost: () => {dispatch(addPostActionCreator());}
});

const MyPostContainer = connect(mapStateToProps,mapDispatchToProps)(Mypost);
export default MyPostContainer;


// const MyPostContainer = (props) => {
//   const dispatch = useDispatch();
//   const postData = useSelector(state => state.profilePage.postData);  
//   const newPostText = useSelector(state => state.profilePage.newPostText);  
//   const handleMessageChange = (text) => {
//     dispatch(upadatePostTextActionCreator(text));
//   };
//   const addPost = () => {
//     dispatch(addPostActionCreator());
//   };
//   return (
//     <Mypost updateNewPostText={handleMessageChange} 
//     addPost={addPost} postData={postData} 
//     newPostText={newPostText}/>
//   );
// } 
// export default MyPostContainer;