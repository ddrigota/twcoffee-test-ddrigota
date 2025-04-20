import { defineEventHandler, getCookie, createError } from 'h3';

export default defineEventHandler(async (event) => {
	const sessionCookie = getCookie(event, 'session');

	if (!sessionCookie) {
		throw createError({
			statusCode: 401,
			message: 'Unauthorized',
		});
	}

	try {
		const session = JSON.parse(sessionCookie);
		return { user: session };
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		throw createError({
			statusCode: 401,
			message: 'Invalid session',
		});
	}
});
