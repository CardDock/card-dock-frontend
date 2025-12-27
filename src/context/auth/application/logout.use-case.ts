import { Injectable } from '@angular/core';
import { AuthPort } from '../domain/port/auth.port';

@Injectable()
export class LogoutUseCase {
	constructor(private readonly authPort: AuthPort) {}

	execute(): Promise<void> {
		return this.authPort.logout();
	}
}
