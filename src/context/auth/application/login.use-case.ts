import { Injectable } from '@angular/core';
import { AuthPort } from '../domain/port/auth.port';

@Injectable()
export class LoginUseCase {
	constructor(private readonly authPort: AuthPort) {}

	async execute(email: string, password: string): ReturnType<AuthPort['login']> {
		const user = await this.authPort.login(email, password);

		return user;
	}
}
