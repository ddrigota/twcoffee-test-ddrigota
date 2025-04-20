import type { H3Error } from 'h3';
import type { Product } from '../schemas';

export type LoginResult = {
	success: boolean;
	name: string;
	surname: string;
};

export type LoginResponse = LoginResult | H3Error;

export type UserSession = {
	name: string;
	surname: string;
	username: string;
};

export type MeResponse = {
	user: UserSession;
};

export type ProductsResponse = {
	products: Product[];
	total: number;
};
