import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthStateModel } from './auth-state.interface';
import { AuthUser } from '../../domain/user/user.entity';
import { ClearUser, SetLoading, SetUser } from './auth.actions';

@State<AuthStateModel>({
	name: 'auth',
	defaults: {
		user: null,
		isAuthenticated: false,
		isLoading: false,
		error: null,
	},
})
@Injectable()
export class AuthState {
	@Selector()
	static user(state: AuthStateModel): AuthUser | null {
		return state.user;
	}

	@Selector()
	static isAuthenticated(state: AuthStateModel): boolean {
		return state.isAuthenticated;
	}

	@Selector()
	static isLoading(state: AuthStateModel): boolean {
		return state.isLoading;
	}

	@Action(SetUser)
	setUser(ctx: StateContext<AuthStateModel>, action: SetUser) {
		ctx.patchState({
			user: action.user,
			isAuthenticated: true,
			error: null,
		});
	}

	@Action(SetLoading)
	setLoading(ctx: StateContext<AuthStateModel>, action: SetLoading) {
		ctx.patchState({
			isLoading: action.isLoading,
		});
	}

	@Action(ClearUser)
	clearUser(ctx: StateContext<AuthStateModel>) {
		ctx.patchState({
			user: null,
			isAuthenticated: false,
			error: null,
		});
	}
}
