import { Injectable } from '@angular/core';
import { environment } from './env';

@Injectable({
	providedIn: 'root',
})
export class EnvService {
	getApiUrl(): string {
		return environment.api.url;
	}

	getSupabaseUrl(): string {
		return environment.supabase.url;
	}

	getSupabaseAnonKey(): string {
		return environment.supabase.anonKey;
	}
}
