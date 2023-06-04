import { Profile, Users } from 'src/app/models/userModels';

export interface appProfile {
  userdetails: Profile;
}

export interface appUsers {
  allusers:  Users[];
}
