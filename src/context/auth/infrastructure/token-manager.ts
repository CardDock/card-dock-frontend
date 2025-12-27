import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class TokenManager {
	private isRefreshing = false;

	setupTokenRefresh(supabase: SupabaseClient) {
		supabase.auth.onAuthStateChange((event, session) => {
			if (event === 'TOKEN_REFRESHED' || event === 'SIGNED_IN') {
				console.log('🔄 Sesión actualizada');
			}
		});

		setInterval(
			() => {
				if (!this.isRefreshing) {
					this.refreshSession(supabase);
				}
			},
			50 * 60 * 1000,
		);
	}

	private async refreshSession(supabase: SupabaseClient) {
		this.isRefreshing = true;
		try {
			await supabase.auth.refreshSession();
		} catch (error) {
			console.error('Error refrescando sesión:', error);
		} finally {
			this.isRefreshing = false;
		}
	}
}
