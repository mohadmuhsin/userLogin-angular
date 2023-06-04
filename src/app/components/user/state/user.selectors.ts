import { createSelector } from '@ngrx/store';
import { appProfile, appUsers } from './user.state';
import { Profile, Users } from 'src/app/models/userModels';

export const userRootSelector = (state: appUsers) => state.allusers;
export const profileRootSelector = (state: appProfile) => state.userdetails;

export const userProfile = createSelector(
  profileRootSelector,
  (userdetails: Profile) => {
    console.log(userdetails, "in selector");
    return userdetails;
  }
);
export const uniqueEmail = createSelector(
  userRootSelector,
  (allUsers: Users[]) => {
    return [...allUsers];
  }
);
