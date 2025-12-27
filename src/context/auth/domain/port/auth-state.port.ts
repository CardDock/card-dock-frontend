import { Observable } from 'rxjs';
import { AuthUser } from '../user/user.entity';

export abstract class AuthStatePort {
	abstract user$: Observable<AuthUser | null>;
	abstract isAuthenticated$: Observable<boolean>;
	abstract isLoading$: Observable<boolean>;
	abstract setUser(user: AuthUser): void;
	abstract clearUser(): void;
	abstract setLoading(isLoading: boolean): void;
}
