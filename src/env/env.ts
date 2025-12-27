import { Environment } from './env.interface';

export const environment: Environment = {
	production: false,
	api: {
		url: 'https://tu-proyecto.supabase.co',
	},
	supabase: {
		url: 'https://znfxfeuxakqennnanvwt.supabase.co',
		anonKey:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuZnhmZXV4YWtxZW5ubmFudnd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MDAxMTcsImV4cCI6MjA2NzQ3NjExN30.diKUr03tvUYgGYt1iN9XPK4DHed6jrJYGuRlSW_A54U',
	},
};
