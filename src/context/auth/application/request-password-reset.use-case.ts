import { Injectable } from '@angular/core';
import { AuthPort } from '../domain/port/auth.port';

@Injectable()
export class RequestPasswordResetUseCase {
	constructor(private readonly authPort: AuthPort) {}

	execute(email: string): Promise<void> {
		if (!email) {
			throw new Error('Email is required to request a password reset.');
		}

		return this.authPort.requestPasswordReset(email);
	}
}
