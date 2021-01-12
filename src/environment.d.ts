declare namespace NodeJS {
	export interface ProcessEnv {
		NODE_ENV: 'development' | 'production' | 'test';
		PORT: string;
		PGUSER: string;
		PGHOST: string;
		PGDATABASE: string;
		PGPORT: string;
		PGPASSWORD: string;
	}
}
