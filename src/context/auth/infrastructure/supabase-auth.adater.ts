import { Injectable } from '@angular/core';
import { AuthPort } from '../domain/port/auth.port';
import { AuthUser } from '../domain/user/user.entity';
import { createClient, SupabaseClient, AuthResponse } from '@supabase/supabase-js';
import { EnvService } from 'src/env/env.service';
import { InvalidCredentialsAuthError } from '../domain/errors/auth.error';
import { TokenManager } from './token-manager';

@Injectable()
export class SupabaseAuthAdapter implements AuthPort {
	private supabase: SupabaseClient;

	constructor(
		private environment: EnvService,
		private tokenManager: TokenManager,
	) {
		this.supabase = createClient(this.environment.getSupabaseUrl(), this.environment.getSupabaseAnonKey(), {
			auth: {
				persistSession: true,
				autoRefreshToken: false,
				detectSessionInUrl: true,
			},
		});
		this.tokenManager.setupTokenRefresh(this.supabase);
	}

	async updatePassword(newPassword: string): Promise<void> {
		const { error } = await this.supabase.auth.updateUser({ password: newPassword });

		if (error) throw error;
	}

	async verifyCurrentPassword(currentPassword: string): Promise<boolean> {
		const { error } = await this.supabase.auth.signInWithPassword({
			email: (await this.getCurrentSession())?.email || '',
			password: currentPassword,
		});

		if (error) {
			throw new Error(error.message);
		}

		return true;
	}

	async singUp(email: string, password: string): Promise<AuthUser> {
		const { data, error } = await this.supabase.auth.signUp({
			email,
			password,
		});

		if (error) {
			throw new Error(error.message);
		}

		if (!data.user?.email && !data.user?.id) {
			throw new Error('Usuario no válido');
		}

		return {
			id: data.user!.id,
			email: data.user!.email!,
		};
	}

	async getCurrentSession(): Promise<AuthUser | null> {
		const { data, error } = await this.supabase.auth.getSession();

		if (error) {
			throw new Error(error.message);
		}

		if (!data?.session?.user?.email || !data?.session?.user?.id) {
			return null;
		}

		return {
			id: data.session.user.id,
			email: data.session.user.email,
		} as AuthUser;
	}

	async login(email: string, password: string): Promise<AuthUser> {
		const { data, error } = await this.supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			throw new InvalidCredentialsAuthError();
		}

		return this.toAuthUser({ data, error });
	}

	async logout(): Promise<void> {
		const { error } = await this.supabase.auth.signOut();

		if (error) {
			throw new Error('Error during logout: ' + error.message);
		}
	}

	private toAuthUser({ data, error }: AuthResponse): AuthUser {
		if (error) {
			throw new Error(error.message);
		}

		if (!data?.user?.email) {
			throw new Error('Usuario no válido');
		}

		return {
			id: data.user.id,
			email: data.user.email,
		} as AuthUser;
	}
}
