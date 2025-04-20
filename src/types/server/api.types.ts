import type { H3Error } from 'h3';

export type LoginResult = {
	success: boolean;
	name: string;
	surname: string;
};

export type LoginResponse = LoginResult | H3Error;
