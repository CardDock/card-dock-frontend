import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

import { AuthStatePort } from '../../domain/port/auth-state.port';
import { AuthUser } from '../../domain/user/user.entity';
import { ClearUser, SetLoading, SetUser } from './auth.actions';

@Injectable()
export class NgxsAuthStateAdapter implements AuthStatePort {
	isAuthenticated$: Observable<boolean> = this.store.select((state) => state.auth.isAuthenticated);
	user$: Observable<AuthUser | null> = this.store.select((state) => state.auth.user);
	isLoading$: Observable<boolean> = this.store.select((state) => state.auth.isLoading);

	constructor(private store: Store) {}

	setUser(user: AuthUser): void {
		this.store.dispatch(new SetUser(user));
	}

	clearUser(): void {
		this.store.dispatch(new ClearUser());
	}

	setLoading(isLoading: boolean): void {
		this.store.dispatch(new SetLoading(isLoading));
	}
}
