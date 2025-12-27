import { AuthErrorCodes } from './auth-error-codes.enum';

export interface AuthErrorJson {
	name: string;
	code: string;
	message: string;
	stack?: string;
}

export function isAuthError(error: unknown): error is AuthError {
	return error instanceof AuthError;
}

export class AuthError extends Error {
	constructor(
		readonly code: string,
		message?: string,
	) {
		super(message || `Authentication error: ${code}`);
		this.name = this.constructor.name;

		this.compatibillityWithES5();
		this.pointDirectlyToWhereError();
	}

	toJson(): AuthErrorJson {
		return {
			name: this.name,
			code: this.code,
			message: this.message,
			stack: this.stack,
		};
	}

	private pointDirectlyToWhereError() {
		if ((Error as any).captureStackTrace) {
			(Error as any).captureStackTrace(this, this.constructor);
		}
	}

	private compatibillityWithES5() {
		Object.setPrototypeOf(this, AuthError.prototype);
	}
}

export class InvalidCredentialsAuthError extends AuthError {
	constructor() {
		super(AuthErrorCodes.INVALID_CREDENTIALS);
	}
}
