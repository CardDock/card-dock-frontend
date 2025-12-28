import { AuthUser } from '../domain/user/user.entity';
import { AuthPort } from '../domain/port/auth.port';
import { Injectable } from '@angular/core';

@Injectable()
export class InitializeAuthUseCase {
	constructor(private readonly authPort: AuthPort) {}

	async execute(): Promise<AuthUser | null> {
		const user = await this.authPort.getCurrentSession();

		if (!user) {
			return null;
		}

		return user;
	}
}
