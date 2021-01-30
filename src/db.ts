import { Pool } from 'pg';
import winston from 'winston';

const db = new Pool();
db.on('error', (err) => {
	winston.error('idle client error', err.message, err.stack);
});

export default db;
