import { defineEventHandler, deleteCookie } from 'h3';

export default defineEventHandler((event) => {
	// Clear the session cookie
	deleteCookie(event, 'session', {
		httpOnly: true,
		sameSite: 'lax',
		path: '/',
	});

	return { success: true };
});
