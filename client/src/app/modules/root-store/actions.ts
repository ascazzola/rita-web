import { Action } from '@ngrx/store';

export enum AppActionTypes {
  Login = '[Auth] Login',
  Logout = '[Auth] Logout'
}

export class Login implements Action {
  readonly type = AppActionTypes.Login;
}

export class Logout implements Action {
  readonly type = AppActionTypes.Logout;
}
export type AppActions
  = Login
  | Logout;
