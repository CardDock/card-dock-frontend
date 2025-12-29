import { Injectable } from '@angular/core';
import { AuthPort } from '../domain/port/auth.port';
import { AuthUser } from '../domain/user/user.entity';

@Injectable()
export class CreateUserUseCase {
	constructor(private readonly authPort: AuthPort) {}

	execute(email: string, password: string): Promise<AuthUser> {
		return this.authPort.singUp(email, password);
	}
}
