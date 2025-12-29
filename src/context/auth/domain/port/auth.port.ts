import { AuthUser } from '../user/user.entity';

export abstract class AuthPort {
	abstract login(email: string, password: string): Promise<AuthUser>;
	abstract logout(): Promise<void>;
	abstract getCurrentSession(): Promise<AuthUser | null>;
	abstract singUp(email: string, password: string): Promise<AuthUser>;
}
