import { AuthUser } from '../../domain/user/user.entity';

export interface AuthStateModel {
	user: AuthUser | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
}
