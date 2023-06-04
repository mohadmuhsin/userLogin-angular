import { createReducer, on } from '@ngrx/store';
import { Profile, Users } from 'src/app/models/userModels';
import { retrieveProfileSuccess, retrievePostsSuccess } from './user.action';

const initialStateOfUser: Profile = {
  _id: '',
  name: '',
  email: '',
  password: '',
  image: '',
  __v: '',
};

// profile
const _profileReducer = createReducer(
  initialStateOfUser,
  on(retrieveProfileSuccess, (state, { userdetails }) => {
    console.log(userdetails);
    console.log("kooooi");
    return userdetails;
  })
);

export function profileReducer(state: any, action: any) {
  return _profileReducer(state, action);
}

//=-----------------------------------------

const initialState: Users[] = [];
// users
const _postReducer = createReducer(
  initialState,
  on(retrievePostsSuccess, (state, { allusers }) => {
    console.log(allusers,'reached reducer');
    
    return [...allusers];
    
  })
);

export function postReducer(state: Users[] = initialState, action: any) {
  return _postReducer(state, action);
}
