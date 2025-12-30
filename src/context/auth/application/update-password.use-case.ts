import { Injectable } from '@angular/core';
import { AuthPort } from '../domain/port/auth.port';

@Injectable()
export class UpdatePasswordUseCase {
	constructor(private authPort: AuthPort) {}

	async execute(currentPassword: string, newPassword: string): Promise<void> {
		const isCurrentPasswordValid = await this.authPort.verifyCurrentPassword(currentPassword);

		if (!isCurrentPasswordValid) {
			throw new Error('Current password is incorrect');
		}

		if (newPassword === currentPassword) {
			throw new Error('New password must be different from the current password');
		}

		await this.authPort.updatePassword(newPassword);
	}
}
