import { Component, model } from '@angular/core';
import { AuthError } from '@supabase/supabase-js';
import { AuthFacade } from 'src/context/auth/application/facades/auth.facade';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	standalone: false,
})
export class LoginComponent {
	isAuthenticated$ = this.authFacade.isAuthenticated$;
	username = model('');
	password = model('');

	constructor(private authFacade: AuthFacade) {}

	onMakeLogin(): void {
		this.login();
	}

	onMakeLogout(): void {
		this.logout();
	}

	private async login() {
		try {
			await this.authFacade.login(this.username(), this.password());

			console.log('Login successful');
		} catch (error: AuthError | any) {
			console.error(error.message);
			return;
		}
	}

	private async logout() {
		this.authFacade.logout();
	}
}
