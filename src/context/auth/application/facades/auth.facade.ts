import { Injectable } from '@angular/core';
import { LoginUseCase } from '../login.use-case';
import { AuthUser } from '../../domain/user/user.entity';
import { AuthStatePort } from '../../domain/port/auth-state.port';
import { LogoutUseCase } from '../logout.use-case';
import { InitializeAuthUseCase } from '../initialize-auth.use-case';
import { CreateUserUseCase } from '../create-user.use-case';
import { UpdatePasswordUseCase } from '../update-password.use-case';
import { RequestPasswordResetUseCase } from '../request-password-reset.use-case';

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
		private readonly createUserUseCase: CreateUserUseCase,
		private readonly updatePasswordUseCase: UpdatePasswordUseCase,
		private readonly requestPasswordResetUseCase: RequestPasswordResetUseCase,
	) {}

	async requestPasswordReset(email: string): Promise<void> {
		await this.requestPasswordResetUseCase.execute(email);
	}

	async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
		await this.updatePasswordUseCase.execute(currentPassword, newPassword);
	}

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

	async singUp(email: string, password: string): Promise<void> {
		const result = await this.createUserUseCase.execute(email, password);

		if (result) {
			const user = result;
			this.authStatePort.setUser(user);
		}
	}

	async initialize(): Promise<void> {
		const result = await this.initializeAuthUseCase.execute();

		if (result) {
			const user = result;
			this.authStatePort.setUser(user);
		}
	}
}
