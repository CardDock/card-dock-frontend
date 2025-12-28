import { Injectable } from '@angular/core';
import { LoginUseCase } from '../login.use-case';
import { AuthUser } from '../../domain/user/user.entity';
import { AuthStatePort } from '../../domain/port/auth-state.port';
import { LogoutUseCase } from '../logout.use-case';
import { InitializeAuthUseCase } from '../initialize-auth.use-case';

@Injectable()
export class AuthFacade {
	readonly user$ = this.authStatePort.user$;
	readonly isAuthenticated$ = this.authStatePort.isAuthenticated$;
	readonly isLoading$ = this.authStatePort.isLoading$;

	constructor(
		private readonly loginUseCase: LoginUseCase,
		private readonly logoutUseCase: LogoutUseCase,
		private readonly authStatePort: AuthStatePort,
		private readonly initializeAuthUseCase: InitializeAuthUseCase,
	) {}

	async login(email: string, password: string): Promise<AuthUser> {
		const result = await this.loginUseCase.execute(email, password);

		if (result) {
			const user = result;
			this.authStatePort.setUser(user);
		}

		return result;
	}

	async logout(): Promise<void> {
		await this.logoutUseCase.execute();

		this.authStatePort.clearUser();
	}

	async initialize(): Promise<void> {
		const result = await this.initializeAuthUseCase.execute();

		if (result) {
			const user = result;
			this.authStatePort.setUser(user);
		}
	}
}
