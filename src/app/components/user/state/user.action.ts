import { createAction, props } from '@ngrx/store';
import { Profile, Users } from 'src/app/models/userModels';

export const retrieveProfile = createAction('[Profile API] Retrieve Profile Success');



export const retrieveProfileSuccess = createAction(
  '[Profile API] Retrieve Profile Success',
  props<{ userdetails: Profile }>()
);

export const retrievePosts = createAction('[Posts API] API success');

export const retrievePostsSuccess = createAction(
  '[Posts API] API Success',
  props<{ allusers: Users[] }>()
  
);

