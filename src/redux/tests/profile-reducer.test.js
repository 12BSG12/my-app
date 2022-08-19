import { connect, useDispatch } from 'react-redux';
import profileReducer, {addPost, deletePost, setUserProfileThunkCreator} from '../profile-reducer';

let state = {
  userProfileData : null,
  postData: [
    {id: 1, message:'Hey, why nobdy love me?', likesCount: 12},
    {id: 2, message:'It`s our new program! Hey!', likesCount: 24},
    {id: 3, message:'It`s our new program! Hey!', likesCount: 24},
  ],
  isFetching: false,
  profileStatus: ''
}

it('lenght = 3', () => {
  //test data
  let action = addPost('123')
  //action
  let newState = profileReducer(state, action)
  ///expectation
  expect(newState.postData.length).toBe(4);
});

it('message = 123', () => {
  //test data
  let action = addPost('123')
  //action
  let newState = profileReducer(state, action)
  ///expectation
  expect(newState.postData[3].message).toBe('123');
});

it('post delete', () => {
  //test data
  let action = deletePost(1);
  //action
  let newState = profileReducer(state, action)
  ///expectation
  expect(newState.postData.length).toBe(2);
});

it('post delete not id', () => {
  //test data
  let action = deletePost(10);
  //action
  let newState = profileReducer(state, action)
  ///expectation
  expect(newState.postData.length).toBe(3);
});

