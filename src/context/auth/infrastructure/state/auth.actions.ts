import { AuthUser } from '../../domain/user/user.entity';

export class SetUser {
	static readonly type = '[Auth] Set User';
	constructor(public readonly user: AuthUser) {}
}

export class ClearUser {
	static readonly type = '[Auth] Clear User';
}

export class SetLoading {
	static readonly type = '[Auth] Set Loading';
	constructor(public readonly isLoading: boolean) {}
}
