export interface Environment {
	production: boolean;
	api: {
		url: string;
	};
	supabase: {
		url: string;
		anonKey: string;
	};
}
