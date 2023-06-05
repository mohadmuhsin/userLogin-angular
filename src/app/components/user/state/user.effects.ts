import { Injectable } from '@angular/core';
import { appService } from './user.service'; // Update the import path for appService
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  retrievePosts,
  retrievePostsSuccess,
  retrieveProfile,
  retrieveProfileSuccess,
} from './user.action';
import { map, switchMap } from 'rxjs';
import { Profile, Users } from 'src/app/models/userModels';

@Injectable()
export class AppEffect {
  constructor(private actions$: Actions, private appService: appService) {} // Update the injection for appService

  loadAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(retrievePosts),
      switchMap(() => {
        console.log(this.actions$, this.appService, 'load all users');
        return this.appService
          .loadUsers()
          .pipe(
            map((data) => retrievePostsSuccess({ allusers: data as Users[] }))
          );
      })
    )
  );

  loadProfile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(retrieveProfile),
        switchMap(() => {
          console.log(this.actions$, 'loadProfile');
          return this.appService
            .loadProfile()
            .pipe(
              map((data) =>
                retrieveProfileSuccess({ userdetails: data as Profile })
              )
            );
        })
      ),
  );
}
