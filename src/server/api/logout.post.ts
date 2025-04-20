import { defineEventHandler, setCookie } from 'h3';

export default defineEventHandler((event) => {
	setCookie(event, 'session', '', {
		httpOnly: true,
		sameSite: 'lax',
		path: '/',
		maxAge: 0,
	});

	return { success: true };
});
