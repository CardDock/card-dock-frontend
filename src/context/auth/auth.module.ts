import { NgModule } from '@angular/core';
import { AuthPort } from './domain/port/auth.port';
import { SupabaseAuthAdapter } from './infrastructure/supabase-auth.adater';
import { LoginUseCase } from './application/login.use-case';
import { AuthFacade } from './application/facades/auth.facade';
import { AuthStatePort } from './domain/port/auth-state.port';
import { NgxsAuthStateAdapter } from './infrastructure/state/ngxs-auth-state.adapter';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './presentation/components/login/login.component';
import { TokenManager } from './infrastructure/token-manager';
import { LogoutUseCase } from './application/logout.use-case';
import { AsyncPipe, CommonModule } from '@angular/common';
import { InitializeAuthUseCase } from './application/initialize-auth.use-case';
import { CreateUserUseCase } from './application/create-user.use-case';
import { UpdatePasswordUseCase } from './application/update-password.use-case';

@NgModule({
	providers: [
		LoginUseCase,
		LogoutUseCase,
		InitializeAuthUseCase,
		CreateUserUseCase,
		UpdatePasswordUseCase,
		AuthFacade,
		{
			provide: AuthPort,
			useClass: SupabaseAuthAdapter,
		},
		{
			provide: AuthStatePort,
			useClass: NgxsAuthStateAdapter,
		},
		TokenManager,
	],
	imports: [FormsModule, CommonModule, AsyncPipe],
	declarations: [LoginComponent],
	exports: [LoginComponent],
})
export class AuthModule {}
