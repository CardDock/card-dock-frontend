import { AuthUser } from '../user/user.entity';

export abstract class AuthPort {
	abstract login(email: string, password: string): Promise<AuthUser>;
}
